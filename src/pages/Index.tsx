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

const TELEGRAM_URL = 'https://t.me/SA1KOVV';

const Index = () => {
  const [subs, setSubs] = useState(120);
  const [online, setOnline] = useState(18);

  useEffect(() => {
    const t = setInterval(() => {
      setSubs((s) => s + (Math.random() > 0.7 ? 1 : 0));
      setOnline(() => 12 + Math.floor(Math.random() * 14));
    }, 3000);
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
          SA1<span className="text-gradient">KOV</span>
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
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00E5FF] to-[#FF2E92] flex items-center justify-center font-display font-700 text-xl">S</div>
                <div>
                  <div className="font-600">SA1KOV</div>
                  <div className="text-xs text-white/40">@SA1KOVV</div>
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
          <LiveStat target={120} label="Подписчиков" icon="Users" live />
          <LiveStat target={10} label="Постов о заработке" icon="FileText" suffix="+" />
          <LiveStat target={95} label="Дочитывают до конца" icon="Eye" suffix="%" />
          <LiveStat target={1} label="Год о деньгах" icon="Calendar" suffix=" год" />
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

      {/* POSTS */}
      <section id="posts" className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        <div className="max-w-2xl mb-14">
          <span className="text-[#7C4DFF] font-600 text-sm uppercase tracking-widest">Последние посты</span>
          <h2 className="font-display font-700 text-4xl md:text-5xl uppercase mt-4 leading-tight">
            Вот чем живёт<br /><span className="text-gradient">канал</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">

          {/* POST 1 — фото с цитатой */}
          <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer"
            className="glass rounded-3xl overflow-hidden group hover:-translate-y-1 transition-all duration-300 block">
            <div className="relative h-64 overflow-hidden">
              <img
                src="https://cdn.poehali.dev/projects/c5e07db2-61bd-4592-bee5-00f7b7d68b47/files/27ce1482-a0c8-4990-9e66-7abac027cb37.jpg"
                alt="Мотивация"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <span className="absolute top-4 left-4 glass rounded-full px-3 py-1 text-xs flex items-center gap-1.5">
                <Icon name="Image" size={12} className="text-[#00E5FF]" /> Фото
              </span>
            </div>
            <div className="p-7">
              <p className="font-display text-xl font-600 uppercase leading-tight">
                "Не смей говорить тебе повезло —<br />я падал больше раз, чем вы пытались"
              </p>
              <div className="flex items-center justify-between mt-5">
                <div className="flex items-center gap-4 text-white/40 text-sm">
                  <span className="flex items-center gap-1"><Icon name="Heart" size={14} /> 14</span>
                  <span className="flex items-center gap-1"><Icon name="Eye" size={14} /> 87</span>
                </div>
                <span className="text-white/30 text-xs">Сегодня</span>
              </div>
            </div>
          </a>

          {/* POST 2 — видео */}
          <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer"
            className="glass rounded-3xl overflow-hidden group hover:-translate-y-1 transition-all duration-300 block">
            <div className="relative h-64 overflow-hidden bg-gradient-to-br from-[#7C4DFF]/40 to-[#FF2E92]/30 flex items-center justify-center">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOEwyNCA0MlY0MmwxMi0yNHoiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L2c+PC9zdmc+')] opacity-20" />
              <div className="relative z-10 text-center">
                <div className="w-20 h-20 rounded-full bg-white/10 border-2 border-white/30 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Icon name="Play" size={32} className="text-white ml-1" />
                </div>
                <span className="text-white/50 text-sm">Нажми, чтобы посмотреть</span>
              </div>
              <span className="absolute top-4 left-4 glass rounded-full px-3 py-1 text-xs flex items-center gap-1.5">
                <Icon name="Video" size={12} className="text-[#FF2E92]" /> Видео
              </span>
              <span className="absolute bottom-4 right-4 glass rounded-full px-3 py-1 text-xs text-white/60">
                1:24
              </span>
            </div>
            <div className="p-7">
              <p className="font-display text-xl font-600 uppercase leading-tight">
                "Ты думаешь, что реально так важно,<br />что о тебе подумают?"
              </p>
              <div className="flex items-center justify-between mt-5">
                <div className="flex items-center gap-4 text-white/40 text-sm">
                  <span className="flex items-center gap-1"><Icon name="Heart" size={14} /> 21</span>
                  <span className="flex items-center gap-1"><Icon name="Eye" size={14} /> 103</span>
                </div>
                <span className="text-white/30 text-xs">Вчера</span>
              </div>
            </div>
          </a>

        </div>
        <div className="text-center mt-10">
          <Button asChild variant="outline" className="rounded-full px-8 border-white/20 text-white hover:bg-white/10 hover:text-white">
            <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer">
              Смотреть все посты <Icon name="ArrowRight" size={16} className="ml-2" />
            </a>
          </Button>
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
          <div className="font-display font-700 text-xl text-white">SA1<span className="text-gradient">KOV</span></div>
          <p>© 2026 SA1KOV. Канал о заработке и мотивации.</p>
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