"use client";
import { Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Canvas, extend, useFrame, useThree, type ThreeElement, type ThreeEvent } from '@react-three/fiber';
import { useGLTF, useTexture } from '@react-three/drei';
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
  type RapierRigidBody,
  type RigidBodyProps
} from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';

const CARD_GLB = '/assets/lanyard/card.glb';
const LANYARD_TEX = '/assets/lanyard/lanyard.png';

extend({ MeshLineGeometry, MeshLineMaterial });

function TransparentStage() {
  const { gl, scene } = useThree();
  useLayoutEffect(() => {
    gl.setClearColor(0x000000, 0);
    scene.background = null;
  });
  useFrame(() => {
    if (scene.background) {
      scene.background = null;
    }
  });
  return null;
}

function TouchPolicy({ panY }: { panY: boolean }) {
  const { gl } = useThree();
  useLayoutEffect(() => {
    const el = gl.domElement;
    el.style.touchAction = panY ? "pan-y" : "none";
  }, [gl, panY]);
  return null;
}

declare module '@react-three/fiber' {
  interface ThreeElements {
    meshLineGeometry: ThreeElement<typeof MeshLineGeometry>;
    meshLineMaterial: ThreeElement<typeof MeshLineMaterial>;
  }
}

// 1x1 transparent pixel — lets useTexture be called unconditionally when a
// front/back image isn't supplied.
const BLANK_PIXEL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

type SizedSource = CanvasImageSource & { width: number; height: number };

function asSizedSource(image: unknown): SizedSource | null {
  if (!image || typeof image !== 'object') {
    return null;
  }
  const sized = image as { width?: number; height?: number };
  if (typeof sized.width !== 'number' || typeof sized.height !== 'number') {
    return null;
  }
  return image as SizedSource;
}

// The card model's front face is UV-mapped to the LEFT half of the texture
// atlas and the back face to the RIGHT half (measured from card.glb). Each
// custom image is composited into its own half so the two faces render
// independently, aspect-preserving (no stretching).
const FRONT_UV_RECT = { x: 0, y: 0, w: 0.5, h: 0.755 };
const BACK_UV_RECT = { x: 0.5, y: 0, w: 0.5, h: 0.757 };

interface LanyardProps {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
  frontImage?: string | null;
  backImage?: string | null;
  imageFit?: 'cover' | 'contain';
  lanyardImage?: string | null;
  lanyardWidth?: number;
}

export default function Lanyard({
  position = [0, 0, 30],
  gravity = [0, -40, 0],
  fov = 20,
  frontImage = null,
  backImage = null,
  imageFit = 'cover',
  lanyardImage = null,
  lanyardWidth = 1
}: LanyardProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState<boolean>(() => typeof window !== 'undefined' && window.innerWidth < 768);
  const [live, setLive] = useState(true);

  useEffect(() => {
    const handleResize = (): void => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) {
      return;
    }

    const sync = (onScreen: boolean) => {
      setLive(onScreen && !document.hidden);
    };

    const io = new IntersectionObserver(([entry]) => sync(entry.isIntersecting), {
      threshold: 0.05,
      rootMargin: '64px',
    });
    io.observe(node);

    const onVis = () => {
      const rect = node.getBoundingClientRect();
      sync(rect.bottom > 0 && rect.top < window.innerHeight);
    };
    document.addEventListener('visibilitychange', onVis);

    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  return (
    <div ref={rootRef} className="relative z-0 h-full w-full origin-center">
      <Canvas
        camera={{ position, fov }}
        dpr={isMobile ? [1, 1] : [1, 1.25]}
        frameloop={live ? 'always' : 'never'}
        gl={{ alpha: true, antialias: false, powerPreference: 'low-power', premultipliedAlpha: true, toneMappingExposure: frontImage ? 0.92 : 1 }}
        style={{ background: 'transparent', touchAction: isMobile ? 'pan-y' : 'none' }}
        className="h-full w-full"
        onCreated={({ gl, scene }) => {
          gl.setClearColor(0x000000, 0);
          scene.background = null;
          gl.domElement.style.touchAction = isMobile ? 'pan-y' : 'none';
        }}
      >
        <TransparentStage />
        <TouchPolicy panY={isMobile} />
        <ambientLight intensity={frontImage ? 1.55 : Math.PI} />
        <directionalLight position={[3, 5, 8]} intensity={1.15} />
        <directionalLight position={[-5, 1, 4]} intensity={0.45} />
        <Suspense fallback={null}>
        <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
          <Band
            isMobile={isMobile}
            frontImage={frontImage}
            backImage={backImage}
            imageFit={imageFit}
            lanyardImage={lanyardImage}
            lanyardWidth={lanyardWidth}
          />
        </Physics>
        </Suspense>
      </Canvas>
    </div>
  );
}

interface BandProps {
  maxSpeed?: number;
  minSpeed?: number;
  isMobile?: boolean;
  frontImage?: string | null;
  backImage?: string | null;
  imageFit?: 'cover' | 'contain';
  lanyardImage?: string | null;
  lanyardWidth?: number;
}

type LanyardRigidBody = RapierRigidBody & {
  lerped?: THREE.Vector3;
};

function Band({
  maxSpeed = 50,
  minSpeed = 0,
  isMobile = false,
  frontImage = null,
  backImage = null,
  imageFit = 'cover',
  lanyardImage = null,
  lanyardWidth = 1
}: BandProps) {
  const band = useRef<THREE.Mesh<InstanceType<typeof MeshLineGeometry>, InstanceType<typeof MeshLineMaterial>>>(null!);
  const fixed = useRef<RapierRigidBody>(null!);
  const j1 = useRef<LanyardRigidBody>(null!);
  const j2 = useRef<LanyardRigidBody>(null!);
  const j3 = useRef<RapierRigidBody>(null!);
  const card = useRef<RapierRigidBody>(null!);

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();

  const segmentProps: RigidBodyProps = {
    type: 'dynamic',
    canSleep: true,
    colliders: false,
    angularDamping: 4,
    linearDamping: 4
  };

  const getLerped = (body: LanyardRigidBody): THREE.Vector3 => {
    if (!body.lerped) {
      body.lerped = new THREE.Vector3().copy(body.translation());
    }

    return body.lerped;
  };

  const { nodes, materials } = useGLTF(CARD_GLB) as unknown as {
    nodes: { card: THREE.Mesh; clip: THREE.Mesh; clamp: THREE.Mesh };
    materials: { base: THREE.MeshPhysicalMaterial; metal: THREE.MeshStandardMaterial };
  };
  const texture = useTexture(lanyardImage || LANYARD_TEX);
  // useTexture must be called unconditionally; use a blank pixel when an image
  // isn't supplied for a given face, then skip compositing it below.
  const frontTex = useTexture(frontImage || BLANK_PIXEL);
  const backTex = useTexture(backImage || BLANK_PIXEL);

  // Composite the front/back images into the card's texture atlas (front = left
  // half, back = right half). Each image is drawn aspect-preserving (no stretch).
  const cardMap = useMemo(() => {
    const baseMap = materials.base.map as THREE.Texture;
    if (!frontImage && !backImage) return baseMap;

    const baseImg = asSizedSource(baseMap.image);
    if (!baseImg) return baseMap;
    const W = baseImg.width;
    const H = baseImg.height;
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');
    if (!ctx) return baseMap;
    // Keep the original baked atlas for the card edges and any untouched face.
    ctx.drawImage(baseImg, 0, 0, W, H);

    const drawFitted = (img: SizedSource, rect: typeof FRONT_UV_RECT) => {
      const rx = rect.x * W;
      const ry = rect.y * H;
      const rw = rect.w * W;
      const rh = rect.h * H;
      const pick = imageFit === 'contain' ? Math.min : Math.max;
      const scale = pick(rw / img.width, rh / img.height);
      const dw = img.width * scale;
      const dh = img.height * scale;
      const dx = rx + (rw - dw) / 2;
      const dy = ry + (rh - dh) / 2;
      ctx.save();
      ctx.beginPath();
      ctx.rect(rx, ry, rw, rh);
      ctx.clip();
      ctx.fillStyle = '#07080b';
      ctx.fillRect(rx, ry, rw, rh);
      ctx.drawImage(img, dx, dy, dw, dh);
      ctx.restore();
    };

    const frontSrc = asSizedSource(frontTex.image);
    const backSrc = asSizedSource(backTex.image);
    if (frontImage && frontSrc) drawFitted(frontSrc, FRONT_UV_RECT);
    if (backImage && backSrc) drawFitted(backSrc, BACK_UV_RECT);

    const composite = new THREE.CanvasTexture(canvas);
    composite.colorSpace = THREE.SRGBColorSpace;
    composite.flipY = baseMap.flipY;
    composite.anisotropy = 16;
    composite.needsUpdate = true;
    return composite;
  }, [frontImage, backImage, imageFit, frontTex, backTex, materials.base.map]);
  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()])
  );
  const [dragged, drag] = useState<false | THREE.Vector3>(false);
  const [hovered, hover] = useState(false);
  const pendingDrag = useRef<{
    pointerId: number;
    offset: THREE.Vector3;
    x: number;
    y: number;
  } | null>(null);

  const endDrag = (event?: ThreeEvent<PointerEvent>) => {
    if (event) {
      try {
        (event.target as Element).releasePointerCapture(event.pointerId);
      } catch {
        /* already released */
      }
    }
    drag(false);
  };

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.45, 0]
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => {
        document.body.style.cursor = 'auto';
      };
    }
  }, [hovered, dragged]);

  useEffect(() => {
    if (!isMobile) {
      return;
    }

    const onMove = (event: PointerEvent) => {
      const pending = pendingDrag.current;
      if (!pending || event.pointerId !== pending.pointerId || dragged) {
        return;
      }
      const dx = event.clientX - pending.x;
      const dy = event.clientY - pending.y;
      if (Math.abs(dx) < 10 && Math.abs(dy) < 10) {
        return;
      }
      if (Math.abs(dy) >= Math.abs(dx)) {
        pendingDrag.current = null;
        return;
      }
      pendingDrag.current = null;
      try {
        (event.target as Element | null)?.setPointerCapture?.(event.pointerId);
      } catch {
        /* capture is optional */
      }
      drag(pending.offset);
    };

    const onUp = (event: PointerEvent) => {
      if (pendingDrag.current?.pointerId === event.pointerId) {
        pendingDrag.current = null;
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [dragged, isMobile]);

  useEffect(() => {
    if (!dragged) {
      return;
    }
    const stop = () => drag(false);
    const blockScroll = (event: TouchEvent) => {
      event.preventDefault();
    };
    window.addEventListener('pointerup', stop);
    window.addEventListener('pointercancel', stop);
    document.addEventListener('touchmove', blockScroll, { passive: false });
    return () => {
      window.removeEventListener('pointerup', stop);
      window.removeEventListener('pointercancel', stop);
      document.removeEventListener('touchmove', blockScroll);
    };
  }, [dragged]);

  useFrame((state, delta) => {
    const fixedBody = fixed.current;
    const joint1 = j1.current;
    const joint2 = j2.current;
    const joint3 = j3.current;
    const cardBody = card.current;
    const strap = band.current;
    if (!fixedBody || !joint1 || !joint2 || !joint3 || !cardBody || !strap) {
      return;
    }

    if (dragged && typeof dragged !== 'boolean') {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [cardBody, joint1, joint2, joint3, fixedBody].forEach((body) => body.wakeUp());
      cardBody.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z
      });
    }

    const t1 = joint1.translation();
    const t2 = joint2.translation();
    const t3 = joint3.translation();
    const tFixed = fixedBody.translation();
    if (![t1.x, t1.y, t1.z, t2.x, t2.y, t2.z, t3.x, t3.y, t3.z, tFixed.x, tFixed.y, tFixed.z].every(Number.isFinite)) {
      return;
    }

    [joint1, joint2].forEach((body) => {
      const lerped = getLerped(body);
      const clampedDistance = Math.max(0.1, Math.min(1, lerped.distanceTo(body.translation())));
      lerped.lerp(body.translation(), delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)));
    });
    curve.points[0].copy(t3);
    curve.points[1].copy(getLerped(joint2));
    curve.points[2].copy(getLerped(joint1));
    curve.points[3].copy(tFixed);
    strap.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
    ang.copy(cardBody.angvel());
    rot.copy(cardBody.rotation());
    cardBody.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z }, true);
  });

  curve.curveType = 'chordal';
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps} type="dynamic">
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps} type="dynamic">
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps} type="dynamic">
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? 'kinematicPosition' : 'dynamic'}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={isMobile ? 1.82 : 2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(event) => {
              pendingDrag.current = null;
              endDrag(event);
            }}
            onPointerCancel={(event) => {
              pendingDrag.current = null;
              endDrag(event);
            }}
            onLostPointerCapture={() => drag(false)}
            onPointerDown={(e: ThreeEvent<PointerEvent>) => {
              const offset = new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation()));
              if (isMobile) {
                pendingDrag.current = {
                  pointerId: e.pointerId,
                  offset,
                  x: e.nativeEvent.clientX,
                  y: e.nativeEvent.clientY,
                };
                return;
              }
              e.stopPropagation();
              (e.target as Element).setPointerCapture(e.pointerId);
              drag(offset);
            }}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={cardMap}
                map-anisotropy={16}
                clearcoat={frontImage || backImage ? 0.08 : isMobile ? 0 : 1}
                clearcoatRoughness={0.5}
                roughness={frontImage || backImage ? 0.55 : 0.9}
                metalness={frontImage || backImage ? 0 : 0.8}
                envMapIntensity={frontImage || backImage ? 0.12 : 1}
                toneMapped={!(frontImage || backImage)}
              />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band} raycast={() => undefined}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap
          map={texture}
          repeat={lanyardImage ? [-1.35, 1] : [-4, 1]}
          lineWidth={lanyardWidth}
        />
      </mesh>
    </>
  );
}
