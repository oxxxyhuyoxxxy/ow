import { useState, useEffect } from 'react';

const capabilities = [
  {
    icon: '🎨',
    title: 'Красивые UI/UX',
    description: 'Создаю современные, адаптивные интерфейсы с анимациями, градиентами и плавными переходами',
    tags: ['React', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    icon: '📊',
    title: 'Визуализация данных',
    description: 'Графики, дашборды, интерактивные диаграммы и панели аналитики',
    tags: ['D3.js', 'Chart.js', 'Recharts'],
  },
  {
    icon: '🛒',
    title: 'E-commerce',
    description: 'Интернет-магазины с корзиной, фильтрацией, оплатой и управлением товарами',
    tags: ['Каталог', 'Корзина', 'Фильтры'],
  },
  {
    icon: '🎮',
    title: 'Игры и интерактив',
    description: 'Браузерные игры, квизы, интерактивные истории и головоломки',
    tags: ['Canvas', 'Анимации', 'Логика'],
  },
  {
    icon: '📝',
    title: 'Инструменты',
    description: 'Калькуляторы, конвертеры, генераторы, планировщики и другие полезные утилиты',
    tags: ['Формы', 'Валидация', 'LocalStorage'],
  },
  {
    icon: '🌐',
    title: 'API интеграции',
    description: 'Подключение к внешним сервисам, получение данных, работа с REST API',
    tags: ['Fetch', 'Axios', 'WebSockets'],
  },
  {
    icon: '📱',
    title: 'Адаптивный дизайн',
    description: 'Сайты, которые отлично выглядят на любом устройстве — от телефона до десктопа',
    tags: ['Mobile-first', 'Responsive', 'PWA'],
  },
  {
    icon: '⚡',
    title: 'Производительность',
    description: 'Оптимизированный код, ленивая загрузка, минимальный размер бандла',
    tags: ['Vite', 'Tree-shaking', 'Lazy load'],
  },
];

const examples = [
  { name: 'Лендинг', emoji: '🚀' },
  { name: 'Дашборд', emoji: '📈' },
  { name: 'Портфолио', emoji: '💼' },
  { name: 'Блог', emoji: '📰' },
  { name: 'Калькулятор', emoji: '🧮' },
  { name: 'Чат', emoji: '💬' },
  { name: 'Таск-менеджер', emoji: '✅' },
  { name: 'Погода', emoji: '🌤️' },
  { name: 'Музыкальный плеер', emoji: '🎵' },
  { name: 'Генератор паролей', emoji: '🔐' },
  { name: 'Рисовалка', emoji: '🖌️' },
  { name: 'Таймер Помодоро', emoji: '🍅' },
];

function AnimatedCounter({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  return <span>{count}</span>;
}

function FloatingParticle({ delay, size, x }: { delay: number; size: number; x: number }) {
  return (
    <div
      className="absolute rounded-full bg-white/10 animate-float"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${6 + Math.random() * 4}s`,
      }}
    />
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [typedText, setTypedText] = useState('');
  const fullText = 'Опишите, что вам нужно — и я создам это!';

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 60);
    return () => clearInterval(timer);
  }, []);

  const particles = Array.from({ length: 15 }, (_, i) => ({
    delay: Math.random() * 5,
    size: 4 + Math.random() * 12,
    x: Math.random() * 100,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {particles.map((p, i) => (
          <FloatingParticle key={i} {...p} />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-700/20 via-transparent to-transparent" />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="mb-6 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm text-purple-200">Готов создавать</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent leading-tight">
            AI Web Developer
          </h1>
          
          <p className="text-xl md:text-2xl text-purple-200 mb-8 h-8">
            {typedText}
            <span className="animate-blink">|</span>
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-6 py-4 text-center">
              <div className="text-3xl font-bold text-purple-300">
                <AnimatedCounter target={50} />+
              </div>
              <div className="text-sm text-purple-400 mt-1">шагов за сессию</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-6 py-4 text-center">
              <div className="text-3xl font-bold text-blue-300">
                <AnimatedCounter target={10} />
              </div>
              <div className="text-sm text-blue-400 mt-1">изображений AI</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-6 py-4 text-center">
              <div className="text-3xl font-bold text-pink-300">∞</div>
              <div className="text-sm text-pink-400 mt-1">возможностей</div>
            </div>
          </div>

          <a
            href="#capabilities"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
          >
            Узнать больше
            <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </section>

      {/* Capabilities Section */}
      <section id="capabilities" className="relative py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
            Что я умею
          </h2>
          <p className="text-center text-purple-300 mb-16 text-lg">
            Полный стек технологий для создания современных веб-приложений
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((cap, i) => (
              <div
                key={i}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:bg-white/10 hover:border-purple-400/50 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/10"
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className={`text-4xl mb-4 transition-transform duration-300 ${hoveredCard === i ? 'scale-125' : ''}`}>
                  {cap.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">{cap.title}</h3>
                <p className="text-sm text-purple-200/70 mb-4">{cap.description}</p>
                <div className="flex flex-wrap gap-2">
                  {cap.tags.map((tag, j) => (
                    <span
                      key={j}
                      className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section className="relative py-24 px-4 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
            Примеры проектов
          </h2>
          <p className="text-center text-purple-300 mb-16 text-lg">
            Просто попросите — и я создам это для вас
          </p>

          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-full p-1 flex gap-1">
              {['Все', 'Приложения', 'Игры', 'Инструменты'].map((tab, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTab(i)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeTab === i
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                      : 'text-purple-300 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {examples.map((ex, i) => (
              <div
                key={i}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 text-center transition-all duration-300 hover:bg-white/10 hover:border-blue-400/50 hover:scale-105 cursor-pointer"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                  {ex.emoji}
                </div>
                <div className="text-sm font-medium text-purple-200">{ex.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="relative py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
            Технологии
          </h2>
          <p className="text-purple-300 mb-16 text-lg">
            Современный стек для быстрых и надёжных приложений
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {[
              { name: 'React', color: 'from-cyan-400 to-blue-500' },
              { name: 'TypeScript', color: 'from-blue-400 to-blue-600' },
              { name: 'Tailwind CSS', color: 'from-teal-400 to-cyan-500' },
              { name: 'Vite', color: 'from-purple-400 to-yellow-400' },
              { name: 'Node.js', color: 'from-green-400 to-green-600' },
              { name: 'Three.js', color: 'from-gray-400 to-gray-600' },
              { name: 'Framer Motion', color: 'from-pink-400 to-rose-500' },
              { name: 'D3.js', color: 'from-orange-400 to-red-500' },
            ].map((tech, i) => (
              <div
                key={i}
                className={`bg-gradient-to-r ${tech.color} p-[1px] rounded-full`}
              >
                <div className="bg-slate-900 px-5 py-2 rounded-full">
                  <span className="font-medium text-white">{tech.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm border border-purple-400/30 rounded-3xl p-12">
            <div className="text-6xl mb-6">✨</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Готовы начать?
            </h2>
            <p className="text-purple-200 text-lg mb-8">
              Просто опишите, что вы хотите создать, и я превращу вашу идею в работающее веб-приложение за считанные минуты.
            </p>
            <div className="bg-black/30 rounded-2xl p-6 text-left">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="font-mono text-sm">
                <span className="text-purple-400">Вы:</span>
                <span className="text-purple-200"> "Создай дашборд для аналитики продаж"</span>
              </div>
              <div className="font-mono text-sm mt-2">
                <span className="text-blue-400">AI:</span>
                <span className="text-blue-200"> "Конечно! Создаю современный дашборд с графиками..."</span>
              </div>
              <div className="font-mono text-sm mt-2">
                <span className="text-green-400">✓</span>
                <span className="text-green-200"> Готово за 30 секунд!</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-purple-400/50 text-sm border-t border-white/5">
        <p>Создано с ❤️ AI Web Developer • React + Tailwind CSS + Vite</p>
      </footer>
    </div>
  );
}
