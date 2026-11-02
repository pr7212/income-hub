import { useEffect, useState } from 'react';
import type { ElementType, FormEvent } from 'react';

import {
  LayoutDashboard,
  Search,
  BriefcaseBusiness,
  Users,
  Wallet,
  Plus,
  TrendingUp,
  Target,
  ArrowUpRight,
  X,
  BrainCircuit,
  Globe,
  Code2,
} from 'lucide-react';

type Income = {
  id: number;
  source: string;
  amount: number;
  date: string;
};

const navigation = [
  { name: 'Overview', icon: LayoutDashboard },
  { name: 'Opportunities', icon: Search },
  { name: 'Applications', icon: BriefcaseBusiness },
  { name: 'Clients', icon: Users },
  { name: 'Income Tracker', icon: Wallet },
];

const opportunities = [
  {
    name: 'Outlier',
    type: 'AI Training',
    url: 'https://outlier.ai/',
    icon: BrainCircuit,
  },
  {
    name: 'Loggy3',
    type: 'AI Training',
    url: 'https://loggy3.com/',
    icon: BrainCircuit,
  },
  {
    name: 'CrowdGen',
    type: 'AI Training',
    url: 'https://crowdgen.com/',
    icon: BrainCircuit,
  },
  {
    name: 'Wellfound',
    type: 'Remote Jobs',
    url: 'https://wellfound.com/jobs',
    icon: Globe,
  },
  {
    name: 'Remotive',
    type: 'Remote Jobs',
    url: 'https://remotive.com/',
    icon: Globe,
  },
  {
    name: 'Upwork',
    type: 'Freelancing',
    url: 'https://www.upwork.com/',
    icon: Code2,
  },
  {
    name: 'Contra',
    type: 'Freelancing',
    url: 'https://contra.com/',
    icon: Globe,
  },
  {
    name: 'Upwork',
    type: 'Freelancing',
    url: 'https://www.upwork.com/',
    icon: Code2,
  },
  {
    name: 'Contra',
    type: 'Freelancing',
    url: 'https://contra.com/',
    icon: Code2,
  },
  {
    name: 'Fiverr',
    type: 'Freelancing',
    url: 'https://www.fiverr.com/',
    icon: Code2,
  },
];

const money = (amount: number) =>
  new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    maximumFractionDigits: 0,
  }).format(amount);

function App() {
  const [active, setActive] = useState('Overview');
  const [showForm, setShowForm] = useState(false);
  const [source, setSource] = useState('');
  const [amount, setAmount] = useState('');

  const [incomes, setIncomes] = useState<Income[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('income-records') || '[]');
    } catch {
      return [];
    }
  });

  const target = 50000;

  // Calculate income for the current month only.
  const now = new Date();

  const monthlyIncomes = incomes.filter((item) => {
    const date = new Date(item.date);

    return (
      !isNaN(date.getTime()) &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    );
  });

  const total = monthlyIncomes.reduce((sum, item) => sum + item.amount, 0);

  const progress = Math.min((total / target) * 100, 100);

  useEffect(() => {
    localStorage.setItem('income-records', JSON.stringify(incomes));
  }, [incomes]);

  function addIncome(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const value = Number(amount);

    if (!source.trim() || !Number.isFinite(value) || value <= 0) {
      return;
    }

    const newIncome: Income = {
      id: Date.now(),
      source: source.trim(),
      amount: value,
      date: new Date().toISOString(),
    };

    setIncomes((current) => [newIncome, ...current]);

    setSource('');
    setAmount('');
    setShowForm(false);
  }

  function removeIncome(id: number) {
    setIncomes((current) => current.filter((item) => item.id !== id));
  }

  return (
    <div className='min-h-screen bg-[#090d18] text-slate-100 md:flex'>
      {/* Sidebar */}
      <aside className='w-full border-b border-slate-800 bg-[#0d1322] p-5 md:min-h-screen md:w-64 md:border-b-0 md:border-r'>
        <div className='mb-8 flex items-center gap-3'>
          <div className='rounded-xl bg-indigo-600 p-2.5'>
            <BrainCircuit size={24} />
          </div>

          <div>
            <h1 className='text-lg font-bold'>AI Income Hub</h1>
            <p className='text-xs text-slate-500'>Build. Earn. Grow.</p>
          </div>
        </div>

        <p className='mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500'>
          Workspace
        </p>

        <nav className='flex gap-2 overflow-x-auto md:flex-col'>
          {navigation.map((item) => {
            const Icon = item.icon;
            const selected = active === item.name;

            return (
              <button
                key={item.name}
                onClick={() => setActive(item.name)}
                className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                  selected
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon size={18} />
                {item.name}
              </button>
            );
          })}
        </nav>

        <div className='mt-10 hidden rounded-xl border border-slate-800 p-4 md:block'>
          <p className='text-xs text-slate-500'>Monthly income target</p>

          <p className='mt-2 text-2xl font-bold'>{money(target)}</p>

          <div className='mt-3 h-2 overflow-hidden rounded-full bg-slate-800'>
            <div
              className='h-full rounded-full bg-indigo-500'
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className='mt-2 text-xs text-slate-500'>
            {progress.toFixed(1)}% achieved
          </p>
        </div>
      </aside>

      {/* Main content */}
      <main className='min-w-0 flex-1 p-5 md:p-8'>
        <header className='mb-8 flex flex-wrap items-center justify-between gap-4'>
          <div>
            <p className='text-sm text-slate-500'>Your workspace</p>

            <h2 className='mt-1 text-2xl font-bold'>{active}</h2>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className='flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold hover:bg-indigo-500'
          >
            <Plus size={18} />
            Record income
          </button>
        </header>

        {active === 'Overview' || active === 'Income Tracker' ? (
          <>
            <div className='mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
              <StatCard
                title='Monthly earnings'
                value={money(total)}
                icon={Wallet}
                detail='Recorded income this month'
              />

              <StatCard
                title='Monthly target'
                value={money(target)}
                icon={Target}
                detail='Your financial goal'
              />

              <StatCard
                title='Target remaining'
                value={money(Math.max(target - total, 0))}
                icon={TrendingUp}
                detail='Amount left to reach goal'
              />
            </div>

            <section className='mb-6 rounded-2xl border border-slate-800 bg-[#111a2c] p-6'>
              <div className='flex flex-wrap justify-between gap-3'>
                <div>
                  <p className='text-sm text-slate-400'>Income progress</p>

                  <h3 className='mt-2 text-3xl font-bold'>
                    {progress.toFixed(1)}%
                  </h3>

                  <p className='mt-1 text-sm text-slate-500'>
                    {money(total)} of {money(target)}
                  </p>
                </div>

                <div className='h-fit rounded-xl bg-indigo-500/10 p-3 text-indigo-400'>
                  <ArrowUpRight size={24} />
                </div>
              </div>

              <div className='mt-6 h-3 overflow-hidden rounded-full bg-slate-800'>
                <div
                  className='h-full rounded-full bg-indigo-500 transition-all'
                  style={{ width: `${progress}%` }}
                />
              </div>
            </section>

            <section className='rounded-2xl border border-slate-800 bg-[#111a2c] p-6'>
              <div className='mb-5 flex items-center justify-between'>
                <h3 className='font-semibold'>Income history</h3>

                <span className='text-xs text-slate-500'>
                  {monthlyIncomes.length} records this month
                </span>
              </div>

              {monthlyIncomes.length === 0 ? (
                <div className='py-12 text-center'>
                  <Wallet className='mx-auto mb-3 text-slate-600' size={35} />

                  <p className='font-medium'>No income recorded yet</p>

                  <p className='mt-1 text-sm text-slate-500'>
                    Record your first payment when you earn it.
                  </p>
                </div>
              ) : (
                <div className='space-y-3'>
                  {monthlyIncomes.map((item) => (
                    <div
                      key={item.id}
                      className='flex items-center justify-between gap-3 rounded-xl bg-slate-800/50 p-4'
                    >
                      <div>
                        <p className='font-medium'>{item.source}</p>

                        <p className='mt-1 text-xs text-slate-500'>
                          {new Date(item.date).toLocaleDateString()}
                        </p>
                      </div>

                      <div className='flex items-center gap-3'>
                        <span className='font-semibold text-emerald-400'>
                          +{money(item.amount)}
                        </span>

                        <button
                          onClick={() => removeIncome(item.id)}
                          aria-label='Delete income record'
                          className='text-slate-500 hover:text-red-400'
                        >
                          <X size={17} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </>
        ) : active === 'Opportunities' ? (
          <section className='grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
            {opportunities.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.name}
                  href={item.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='rounded-2xl border border-slate-800 bg-[#111a2c] p-5 transition hover:border-indigo-500'
                >
                  <Icon className='mb-4 text-indigo-400' size={26} />

                  <h3 className='font-semibold'>{item.name}</h3>

                  <p className='mt-1 text-sm text-slate-500'>{item.type}</p>

                  <p className='mt-5 text-sm text-indigo-400'>
                    Visit platform ↗
                  </p>
                </a>
              );
            })}
          </section>
        ) : (
          <section className='rounded-2xl border border-slate-800 bg-[#111a2c] p-10 text-center'>
            <BriefcaseBusiness
              className='mx-auto mb-4 text-indigo-400'
              size={32}
            />

            <h3 className='text-lg font-semibold'>{active}</h3>

            <p className='mt-2 text-sm text-slate-400'>
              This module is ready for the next development milestone.
            </p>
          </section>
        )}

        <footer className='mt-8 text-center text-xs text-slate-600'>
          AI Income Hub · Your online income workspace
        </footer>
      </main>

      {/* Income form modal */}
      {showForm && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4'>
          <form
            onSubmit={addIncome}
            className='w-full max-w-md rounded-2xl border border-slate-700 bg-[#111a2c] p-6'
          >
            <div className='mb-6 flex items-center justify-between'>
              <h3 className='text-lg font-bold'>Record new income</h3>

              <button
                type='button'
                onClick={() => setShowForm(false)}
                aria-label='Close form'
              >
                <X />
              </button>
            </div>

            <label className='mb-2 block text-sm text-slate-400'>
              Income source
            </label>

            <input
              required
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder='e.g. Website development'
              className='mb-5 w-full rounded-xl border border-slate-700 bg-slate-900 p-3 outline-none focus:border-indigo-500'
            />

            <label className='mb-2 block text-sm text-slate-400'>
              Amount (KES)
            </label>

            <input
              required
              type='number'
              min='1'
              step='0.01'
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder='e.g. 15000'
              className='mb-6 w-full rounded-xl border border-slate-700 bg-slate-900 p-3 outline-none focus:border-indigo-500'
            />

            <button
              type='submit'
              className='w-full rounded-xl bg-indigo-600 p-3 font-semibold hover:bg-indigo-500'
            >
              Save income
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

function StatCard({
  title,
  value,
  icon: Icon,
  detail,
}: {
  title: string;
  value: string;
  icon: ElementType;
  detail: string;
}) {
  return (
    <div className='rounded-2xl border border-slate-800 bg-[#111a2c] p-5'>
      <div className='mb-5 flex items-center justify-between'>
        <p className='text-sm text-slate-400'>{title}</p>

        <Icon className='text-indigo-400' size={21} />
      </div>

      <p className='text-2xl font-bold'>{value}</p>

      <p className='mt-2 text-xs text-slate-500'>{detail}</p>
    </div>
  );
}

export default App;
