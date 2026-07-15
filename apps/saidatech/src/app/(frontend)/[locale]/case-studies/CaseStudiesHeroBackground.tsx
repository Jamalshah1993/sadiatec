import Image from 'next/image'

export function CaseStudiesHeroBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Soft base tint across the full section so it never looks like it "ends" */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-accent/10 via-brand-primary/5 to-brand-primary/10" />

      {/* Top-left wash */}
      <div
        className="absolute -top-24 -left-24 w-[480px] h-[480px] bg-brand-accent/30"
        style={{ borderRadius: '58% 42% 65% 35% / 45% 55% 45% 55%' }}
      />

      {/* Top-right solid circle */}
      <div className="absolute -top-10 right-16 w-64 h-64 rounded-full bg-brand-primary/15" />

      {/* Upper-mid blob */}
      <div
        className="absolute top-[15%] left-[36%] w-56 h-56 bg-brand-primary/20"
        style={{ borderRadius: '63% 37% 54% 46% / 55% 48% 52% 45%' }}
      />

      {/* Wavy divider near top */}
      <svg
        className="absolute inset-x-0 top-[12%] w-full"
        viewBox="0 0 1800 200"
        preserveAspectRatio="none"
      >
        <path
          d="M0,100 C400,180 700,20 1100,90 C1400,140 1600,60 1800,100"
          stroke="var(--color-brand-primary)"
          strokeOpacity="0.35"
          strokeWidth="6"
          fill="none"
        />
      </svg>

      {/* Mid-page shapes, left side */}
      <div
        className="absolute top-[42%] -left-16 w-72 h-72 bg-brand-accent/15"
        style={{ borderRadius: '52% 48% 40% 60% / 60% 45% 55% 40%' }}
      />
      <div className="absolute top-[48%] left-[8%] w-16 h-16 rounded-full bg-brand-primary/25" />

      {/* Mid-page shapes, right side */}
      <div className="absolute top-[55%] right-[10%] w-20 h-20 rounded-full bg-brand-accent/25" />
      <div
        className="absolute top-[62%] -right-20 w-80 h-80 bg-brand-primary/12"
        style={{ borderRadius: '45% 55% 60% 40% / 50% 40% 60% 50%' }}
      />

      {/* Lower shapes */}
      <div
        className="absolute top-[80%] left-[20%] w-64 h-64 bg-brand-accent/15"
        style={{ borderRadius: '55% 45% 48% 52% / 42% 58% 42% 58%' }}
      />
      <div className="absolute top-[88%] right-[25%] w-24 h-24 rounded-full bg-brand-primary/15" />

      {/* Top illustration */}
      <div className="absolute top-[2%] right-[8%] w-[300px] md:w-[380px] opacity-90">
        <Image
          src="/list-top.png"
          alt=""
          width={380}
          height={280}
          className="w-full h-auto"
          priority
        />
      </div>

      {/* Bottom illustration */}
     <div className="hidden md:block absolute bottom-0 right-[1%] w-[260px] md:w-[320px] opacity-90">
        <Image
          src="/list-bottom.png"
          alt=""
          width={320}
          height={240}
          className="w-full h-auto"
        />
      </div>
    </div>
  )
}