'use client';

type JrBuildingSceneProps = {
  scrollY: number;
  viewportHeight: number;
  mouseX: number;
  mouseY: number;
  image: string;
};

export function JrBuildingScene({
  scrollY,
  viewportHeight,
  mouseX,
  mouseY,
  image,
}: JrBuildingSceneProps) {
  const scrollProgress = Math.min(
    scrollY / Math.max(viewportHeight * 1.85, 1),
    1,
  );

  const translateY = scrollProgress * -36;
  const scale = 1.05 + scrollProgress * 0.12;
  const parallaxX = mouseX * 18;
  const parallaxY = mouseY * 10 - scrollProgress * 20;

  return (
    <div className="jr-building-scene" aria-hidden>
      <div
        className="jr-building-photo-wrap"
        style={{
          transform: `translate3d(${parallaxX}px, ${translateY + parallaxY}px, 0) scale(${scale})`,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt="" className="jr-building-photo" />
      </div>
    </div>
  );
}
