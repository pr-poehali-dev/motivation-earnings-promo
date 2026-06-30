import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const useCountUp = (target: number, duration = 1600) => {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setValue(Math.floor(eased * target));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);

  return { value, ref };
};

const LiveStat = ({
  target, label, icon, suffix = '', live = false,
}: { target: number; label: string; icon: string; suffix?: string; live?: boolean }) => {
  const { value, ref } = useCountUp(target);
  return (
    <div ref={ref} className="glass rounded-3xl p-7 relative overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div className="w-11 h-11 rounded-2xl bg-white/5 flex items-center justify-center">
          <Icon name={icon} size={22} className="text-[#00E5FF]" />
        </div>
        {live && (
          <span className="flex items-center gap-1.5 text-xs font-medium text-[#FF2E92]">
            <span className="relative flex h-2 w-2">
              <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-[#FF2E92]" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF2E92]" />
            </span>
            LIVE
          </span>
        )}
      </div>
      <div className="font-display text-5xl font-700 text-white tabular-nums">
        {value.toLocaleString('ru-RU')}{suffix}
      </div>
      <div className="text-white/50 mt-1 text-sm">{label}</div>
    </div>
  );
};

const TELEGRAM_URL = 'https://t.me/masshtab_money';

const Index = () => {
  const [subs, setSubs] = useState(48217);
  const [online, setOnline] = useState(1342);

  useEffect(() => {
    const t = setInterval(() => {
      setSubs((s) => s + Math.floor(Math.random() * 3));
      setOnline(() => 1200 + Math.floor(Math.random() * 400));
    }, 2500);
    return () => clearInterval(t);
  }, []);

  const ticker = ['ДЕНЬГИ', 'МОТИВАЦИЯ', 'РОСТ', 'СВОБОДА', 'ДИСЦИПЛИНА', 'КАПИТАЛ'];

  const content = [
    { icon: 'TrendingUp', title: 'Схемы заработка', desc: 'Реальные способы поднять доход — от первой тысячи до системного капитала.' },
    { icon: 'Flame', title: 'Заряд мотивации', desc: 'Каждое утро — пост, после которого хочется действовать, а не откладывать.' },
    { icon: 'Brain', title: 'Мышление богатых', desc: 'Разбираем привычки и установки, которые отделяют бедных от состоятельных.' },
    { icon: 'Target', title: 'Цели и дисциплина', desc: 'Пошаговые планы и трекеры, чтобы доводить начатое до результата.' },
    { icon: 'Coins', title: 'Финансы под контролем', desc: 'Бюджет, инвестиции и подушка безопасности простым языком.' },
    { icon: 'Users', title: 'Живое сообщество', desc: 'Тысячи людей, которые растут вместе. Поддержка и обмен опытом.' },
  ];

  return (
    <div className="bg-mesh grain relative min-h-screen text-white overflow-x-hidden font-sans">
      {/* NAV */}
      <header className="relative z-20 max-w-6xl mx-auto px-6 py-7 flex items-center justify-between">
        <div className="font-display font-700 text-2xl tracking-wide">
          МАС<span className="text-gradient">ШТАБ</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm text-white/60">
          <a href="#about" className="hover:text-white transition-colors">О канале</a>
          <a href="#content" className="hover:text-white transition-colors">Контент</a>
          <a href="#join" className="hover:text-white transition-colors">Подписка</a>
        </nav>
        <Button asChild className="rounded-full bg-white text-black hover:bg-white/90 font-600">
          <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer">
            <Icon name="Send" size={16} className="mr-1.5" /> Telegram
          </a>
        </Button>
      </header>

      {/* HERO */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pt-10 pb-24">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          <div className="animate-fade-in">
            <span className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-xs text-white/70 mb-7">
              <span className="relative flex h-2 w-2">
                <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-[#00E5FF]" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00E5FF]" />
              </span>
              Канал обновляется прямо сейчас
            </span>
            <h1 className="font-display font-700 leading-[0.92] text-6xl md:text-7xl lg:text-[5.5rem] uppercase">
              Деньги<br />любят<br /><span className="text-gradient">действие</span>
            </h1>
            <p className="text-white/60 text-lg mt-7 max-w-md">
              Телеграм-канал о заработке и мотивации. Без воды — только то, что
              реально двигает тебя к деньгам и свободе.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-9">
              <Button asChild className="rounded-full h-14 px-8 text-base font-600 bg-gradient-to-r from-[#00E5FF] via-[#7C4DFF] to-[#FF2E92] text-white hover:opacity-90 transition-opacity">
                <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer">
                  <Icon name="Send" size={18} className="mr-2" /> Подписаться бесплатно
                </a>
              </Button>
              <a href="#content" className="text-white/70 hover:text-white transition-colors flex items-center gap-2 text-sm">
                Что внутри <Icon name="ArrowDown" size={16} />
              </a>
            </div>
          </div>

          {/* LIVE HERO CARD */}
          <div className="relative animate-float">
            <div className="glass rounded-[2rem] p-8 relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00E5FF] to-[#FF2E92] flex items-center justify-center font-display font-700 text-xl">М</div>
                <div>
                  <div className="font-600">МАСШТАБ</div>
                  <div className="text-xs text-white/40">@masshtab_money</div>
                </div>
              </div>
              <div className="font-display text-6xl font-700 tabular-nums text-white">
                {subs.toLocaleString('ru-RU')}
              </div>
              <div className="text-white/50 text-sm mb-6">подписчиков и растёт</div>
              <div className="flex items-center justify-between glass rounded-2xl px-5 py-4">
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-[#39FF14]" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#39FF14]" />
                  </span>
                  Онлайн сейчас
                </div>
                <span className="font-display text-2xl font-600 tabular-nums">{online.toLocaleString('ru-RU')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="relative z-10 border-y border-white/10 py-5 overflow-hidden bg-white/[0.02]">
        <div className="flex w-max animate-marquee">
          {[...ticker, ...ticker].map((w, i) => (
            <span key={i} className="font-display font-600 text-2xl uppercase mx-8 flex items-center gap-8 text-white/30">
              {w} <Icon name="Sparkles" size={18} className="text-[#FF2E92]" />
            </span>
          ))}
        </div>
      </div>

      {/* ABOUT / STATS */}
      <section id="about" className="relative z-10 max-w-6xl mx-auto px-6 py-24">
        <div className="max-w-2xl mb-14">
          <span className="text-[#00E5FF] font-600 text-sm uppercase tracking-widest">О канале</span>
          <h2 className="font-display font-700 text-4xl md:text-5xl uppercase mt-4 leading-tight">
            Место, где идеи<br />превращаются в <span className="text-gradient">доход</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <LiveStat target={48217} label="Подписчиков" icon="Users" live />
          <LiveStat target={1200} label="Постов о заработке" icon="FileText" suffix="+" />
          <LiveStat target={97} label="Дочитывают до конца" icon="Eye" suffix="%" />
          <LiveStat target={5} label="Лет о деньгах" icon="Calendar" suffix=" лет" />
        </div>
      </section>

      {/* CONTENT */}
      <section id="content" className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        <div className="max-w-2xl mb-14">
          <span className="text-[#FF2E92] font-600 text-sm uppercase tracking-widest">Контент</span>
          <h2 className="font-display font-700 text-4xl md:text-5xl uppercase mt-4 leading-tight">
            Что ты получишь<br />внутри канала
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {content.map((c, i) => (
            <div
              key={i}
              className="glass rounded-3xl p-7 hover:bg-white/[0.07] transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#7C4DFF] to-[#FF2E92] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Icon name={c.icon} size={24} className="text-white" />
              </div>
              <h3 className="font-display font-600 text-xl uppercase mb-2">{c.title}</h3>
              <p className="text-white/55 text-sm leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* JOIN / CTA */}
      <section id="join" className="relative z-10 max-w-6xl mx-auto px-6 py-24">
        <div className="glass rounded-[2.5rem] p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#7C4DFF]/30 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-[#FF2E92]/30 blur-3xl" />
          <div className="relative">
            <span className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-xs text-white/70 mb-6">
              <Icon name="Gift" size={14} className="text-[#00E5FF]" /> Подписка бесплатная
            </span>
            <h2 className="font-display font-700 text-4xl md:text-6xl uppercase leading-[0.95]">
              Начни зарабатывать<br />с <span className="text-gradient">первого поста</span>
            </h2>
            <p className="text-white/60 mt-6 max-w-lg mx-auto">
              Присоединяйся к {subs.toLocaleString('ru-RU')} читателям, которые меняют
              отношение к деньгам. Один шаг — и ты внутри.
            </p>
            <Button asChild className="rounded-full h-15 px-10 py-7 mt-9 text-lg font-600 bg-white text-black hover:bg-white/90">
              <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer">
                <Icon name="Send" size={20} className="mr-2" /> Перейти в Telegram
              </a>
            </Button>
            <div className="flex items-center justify-center gap-2 mt-5 text-white/40 text-sm">
              <Icon name="ShieldCheck" size={15} /> Никакого спама. Только польза.
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/10 mt-10">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-white/40 text-sm">
          <div className="font-display font-700 text-xl text-white">МАС<span className="text-gradient">ШТАБ</span></div>
          <p>© 2026 МАСШТАБ. Канал о заработке и мотивации.</p>
          <div className="flex gap-4">
            <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer">
              <Icon name="Send" size={18} className="hover:text-white transition-colors cursor-pointer" />
            </a>
            <Icon name="Instagram" size={18} className="hover:text-white transition-colors cursor-pointer" />
            <Icon name="Youtube" size={18} className="hover:text-white transition-colors cursor-pointer" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;