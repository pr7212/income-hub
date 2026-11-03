import { useEffect, useMemo, useState } from 'react';
import type { ElementType, FormEvent, ReactNode } from 'react';

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
  Bookmark,
  Pencil,
  Mail,
  Phone,
  CircleDollarSign,
} from 'lucide-react';

// ============================================
// TYPES
// ============================================

type Income = {
  id: number;
  source: string;
  amount: number;
  date: string;
};

type ApplicationStatus =
  | 'Saved'
  | 'Applied'
  | 'Assessment'
  | 'Interview'
  | 'Accepted'
  | 'Rejected';

type JobApplication = {
  id: number;
  company: string;
  role: string;
  platform: string;
  status: ApplicationStatus;
  date: string;
  notes: string;
};

type Opportunity = {
  id: string;
  name: string;
  category: 'AI Training' | 'Remote Jobs' | 'Freelancing';
  url: string;
  icon: ElementType;
};

type PaymentStatus = 'Pending' | 'Partially Paid' | 'Paid';

type Client = {
  id: number;
  name: string;
  business: string;
  email: string;
  phone: string;
  service: string;
  amount: number;
  paid: number;
  status: PaymentStatus;
  notes: string;
  date: string;
};

type Page =
  | 'Overview'
  | 'Opportunities'
  | 'Applications'
  | 'Clients'
  | 'Income Tracker';

// ============================================
// CONSTANTS
// ============================================

const MONTHLY_TARGET = 50000;

const navigation: { name: Page; icon: ElementType }[] = [
  { name: 'Overview', icon: LayoutDashboard },
  { name: 'Opportunities', icon: Search },
  { name: 'Applications', icon: BriefcaseBusiness },
  { name: 'Clients', icon: Users },
  { name: 'Income Tracker', icon: Wallet },
];

const applicationStatuses: ApplicationStatus[] = [
  'Saved',
  'Applied',
  'Assessment',
  'Interview',
  'Accepted',
  'Rejected',
];

const paymentStatuses: PaymentStatus[] = ['Pending', 'Partially Paid', 'Paid'];

const opportunities: Opportunity[] = [
  {
    id: 'outlier',
    name: 'Outlier',
    category: 'AI Training',
    url: 'https://outlier.ai/',
    icon: BrainCircuit,
  },
  {
    id: 'crowdgen',
    name: 'CrowdGen',
    category: 'AI Training',
    url: 'https://crowdgen.com/',
    icon: BrainCircuit,
  },
  {
    id: 'micro1',
    name: 'Micro1',
    category: 'AI Training',
    url: 'https://micro1.com/',
    icon: BrainCircuit,
  },
  {
    id: 'margvoice',
    name: 'MargVoice',
    category: 'AI Training',
    url: 'https://margvoice.com/',
    icon: BrainCircuit,
  },
  {
    id: 'kuro',
    name: 'Kuro',
    category: 'AI Training',
    url: 'https://kuro.com/',
    icon: BrainCircuit,
  },
  {
    id: 'loggy3',
    name: 'Loggy3',
    category: 'AI Training',
    url: 'https://loggy3.com/',
    icon: BrainCircuit,
  },
  {
    id: 'wellfound',
    name: 'Wellfound',
    category: 'Remote Jobs',
    url: 'https://wellfound.com/jobs',
    icon: Globe,
  },
  {
    id: 'remotive',
    name: 'Remotive',
    category: 'Remote Jobs',
    url: 'https://remotive.com/',
    icon: Globe,
  },
  {
    id: 'upwork',
    name: 'Upwork',
    category: 'Freelancing',
    url: 'https://www.upwork.com/',
    icon: Code2,
  },
  {
    id: 'opentrainai',
    name: 'OpenTrainAI',
    category: 'AI Training',
    url: 'https://opentrainai.com/',
    icon: BrainCircuit,
  },
  {
    id: 'contra',
    name: 'Contra',
    category: 'Freelancing',
    url: 'https://contra.com/',
    icon: Code2,
  },
  {
    id: 'fiverr',
    name: 'Fiverr',
    category: 'Freelancing',
    url: 'https://www.fiverr.com/',
    icon: Code2,
  },
];

// ============================================
// HELPERS
// ============================================

const fieldClass =
  'w-full rounded-xl border border-slate-700 bg-slate-900 p-3 text-sm outline-none focus:border-indigo-500';

function money(amount: number) {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    maximumFractionDigits: 0,
  }).format(amount);
}

function readLocalStorage<T>(key: string, fallback: T): T {
  try {
    const saved = localStorage.getItem(key);
    return saved ? (JSON.parse(saved) as T) : fallback;
  } catch {
    return fallback;
  }
}

function getPaymentStatus(amount: number, paid: number): PaymentStatus {
  if (paid <= 0) return 'Pending';
  if (paid >= amount) return 'Paid';
  return 'Partially Paid';
}

function statusStyle(status: string) {
  switch (status) {
    case 'Paid':
    case 'Accepted':
      return 'bg-emerald-500/10 text-emerald-400';

    case 'Partially Paid':
    case 'Interview':
    case 'Assessment':
      return 'bg-amber-500/10 text-amber-400';

    case 'Rejected':
      return 'bg-red-500/10 text-red-400';

    default:
      return 'bg-indigo-500/10 text-indigo-400';
  }
}

// ============================================
// MAIN APPLICATION
// ============================================

function App() {
  const [active, setActive] = useState<Page>('Overview');

  // Income
  const [incomes, setIncomes] = useState<Income[]>(() =>
    readLocalStorage('income-records', [])
  );
  const [showIncomeForm, setShowIncomeForm] = useState(false);
  const [incomeSource, setIncomeSource] = useState('');
  const [incomeAmount, setIncomeAmount] = useState('');

  // Opportunities
  const [savedOpportunities, setSavedOpportunities] = useState<string[]>(() =>
    readLocalStorage('saved-opportunities', [])
  );
  const [opportunitySearch, setOpportunitySearch] = useState('');
  const [opportunityFilter, setOpportunityFilter] = useState('All');

  // Applications
  const [applications, setApplications] = useState<JobApplication[]>(() =>
    readLocalStorage('job-applications', [])
  );
  const [applicationSearch, setApplicationSearch] = useState('');
  const [applicationFilter, setApplicationFilter] = useState('All');
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [editingApplication, setEditingApplication] =
    useState<JobApplication | null>(null);

  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [platform, setPlatform] = useState('');
  const [applicationStatus, setApplicationStatus] =
    useState<ApplicationStatus>('Saved');
  const [applicationNotes, setApplicationNotes] = useState('');

  // Clients
  const [clients, setClients] = useState<Client[]>(() =>
    readLocalStorage('clients', [])
  );
  const [clientSearch, setClientSearch] = useState('');
  const [clientFilter, setClientFilter] = useState('All');
  const [showClientForm, setShowClientForm] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  const [clientName, setClientName] = useState('');
  const [clientBusiness, setClientBusiness] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientService, setClientService] = useState('');
  const [clientAmount, setClientAmount] = useState('');
  const [clientPaid, setClientPaid] = useState('');
  const [clientNotes, setClientNotes] = useState('');

  // ============================================
  // PERSISTENCE
  // ============================================

  useEffect(() => {
    localStorage.setItem('income-records', JSON.stringify(incomes));
  }, [incomes]);

  useEffect(() => {
    localStorage.setItem(
      'saved-opportunities',
      JSON.stringify(savedOpportunities)
    );
  }, [savedOpportunities]);

  useEffect(() => {
    localStorage.setItem('job-applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('clients', JSON.stringify(clients));
  }, [clients]);

  // ============================================
  // DERIVED DATA
  // ============================================

  const now = new Date();

  const monthlyIncomes = useMemo(
    () =>
      incomes.filter((item) => {
        const date = new Date(item.date);

        return (
          !Number.isNaN(date.getTime()) &&
          date.getMonth() === now.getMonth() &&
          date.getFullYear() === now.getFullYear()
        );
      }),
    [incomes]
  );

  const total = monthlyIncomes.reduce((sum, item) => sum + item.amount, 0);

  const progress = Math.min((total / MONTHLY_TARGET) * 100, 100);

  const totalClientValue = clients.reduce(
    (sum, client) => sum + client.amount,
    0
  );

  const totalClientPaid = clients.reduce((sum, client) => sum + client.paid, 0);

  const outstandingBalance = totalClientValue - totalClientPaid;

  const activeApplications = applications.filter(
    (item) => !['Accepted', 'Rejected'].includes(item.status)
  ).length;

  const filteredOpportunities = opportunities.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(opportunitySearch.toLowerCase().trim());

    const matchesFilter =
      opportunityFilter === 'All' ||
      (opportunityFilter === 'Saved'
        ? savedOpportunities.includes(item.id)
        : item.category === opportunityFilter);

    return matchesSearch && matchesFilter;
  });

  const filteredApplications = applications.filter((item) => {
    const query = applicationSearch.toLowerCase().trim();

    const matchesSearch =
      item.company.toLowerCase().includes(query) ||
      item.role.toLowerCase().includes(query) ||
      item.platform.toLowerCase().includes(query);

    return (
      matchesSearch &&
      (applicationFilter === 'All' || item.status === applicationFilter)
    );
  });

  const filteredClients = clients.filter((client) => {
    const query = clientSearch.toLowerCase().trim();

    const matchesSearch =
      client.name.toLowerCase().includes(query) ||
      client.business.toLowerCase().includes(query) ||
      client.email.toLowerCase().includes(query) ||
      client.service.toLowerCase().includes(query);

    return (
      matchesSearch &&
      (clientFilter === 'All' || client.status === clientFilter)
    );
  });

  // ============================================
  // INCOME ACTIONS
  // ============================================

  function addIncome(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const value = Number(incomeAmount);

    if (!incomeSource.trim() || !Number.isFinite(value) || value <= 0) {
      return;
    }

    const newIncome: Income = {
      id: Date.now(),
      source: incomeSource.trim(),
      amount: value,
      date: new Date().toISOString(),
    };

    setIncomes((current) => [newIncome, ...current]);
    setIncomeSource('');
    setIncomeAmount('');
    setShowIncomeForm(false);
  }

  function removeIncome(id: number) {
    if (!window.confirm('Delete this income record?')) return;

    setIncomes((current) => current.filter((item) => item.id !== id));
  }

  // ============================================
  // OPPORTUNITY ACTIONS
  // ============================================

  function toggleSavedOpportunity(id: string) {
    setSavedOpportunities((current) =>
      current.includes(id)
        ? current.filter((savedId) => savedId !== id)
        : [...current, id]
    );
  }

  // ============================================
  // APPLICATION ACTIONS
  // ============================================

  function resetApplicationForm() {
    setCompany('');
    setRole('');
    setPlatform('');
    setApplicationStatus('Saved');
    setApplicationNotes('');
    setEditingApplication(null);
    setShowApplicationForm(false);
  }

  function openNewApplicationForm() {
    resetApplicationForm();
    setShowApplicationForm(true);
  }

  function openEditApplicationForm(item: JobApplication) {
    setEditingApplication(item);
    setCompany(item.company);
    setRole(item.role);
    setPlatform(item.platform);
    setApplicationStatus(item.status);
    setApplicationNotes(item.notes);
    setShowApplicationForm(true);
  }

  function saveApplication(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!company.trim() || !role.trim()) return;

    if (editingApplication) {
      setApplications((current) =>
        current.map((item) =>
          item.id === editingApplication.id
            ? {
                ...item,
                company: company.trim(),
                role: role.trim(),
                platform: platform.trim(),
                status: applicationStatus,
                notes: applicationNotes.trim(),
              }
            : item
        )
      );
    } else {
      const newApplication: JobApplication = {
        id: Date.now(),
        company: company.trim(),
        role: role.trim(),
        platform: platform.trim(),
        status: applicationStatus,
        date: new Date().toISOString(),
        notes: applicationNotes.trim(),
      };

      setApplications((current) => [newApplication, ...current]);
    }

    resetApplicationForm();
  }

  function deleteApplication(id: number) {
    if (!window.confirm('Delete this application?')) return;

    setApplications((current) => current.filter((item) => item.id !== id));
  }

  // ============================================
  // CLIENT ACTIONS
  // ============================================

  function resetClientForm() {
    setClientName('');
    setClientBusiness('');
    setClientEmail('');
    setClientPhone('');
    setClientService('');
    setClientAmount('');
    setClientPaid('');
    setClientNotes('');
    setEditingClient(null);
    setShowClientForm(false);
  }

  function openNewClientForm() {
    resetClientForm();
    setShowClientForm(true);
  }

  function openEditClientForm(client: Client) {
    setEditingClient(client);
    setClientName(client.name);
    setClientBusiness(client.business);
    setClientEmail(client.email);
    setClientPhone(client.phone);
    setClientService(client.service);
    setClientAmount(String(client.amount));
    setClientPaid(String(client.paid));
    setClientNotes(client.notes);
    setShowClientForm(true);
  }

  function saveClient(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const amountValue = Number(clientAmount);
    const paidValue = Number(clientPaid || 0);

    if (
      !clientName.trim() ||
      !clientService.trim() ||
      !Number.isFinite(amountValue) ||
      !Number.isFinite(paidValue) ||
      amountValue <= 0 ||
      paidValue < 0 ||
      paidValue > amountValue
    ) {
      return;
    }

    const clientData = {
      name: clientName.trim(),
      business: clientBusiness.trim(),
      email: clientEmail.trim(),
      phone: clientPhone.trim(),
      service: clientService.trim(),
      amount: amountValue,
      paid: paidValue,
      status: getPaymentStatus(amountValue, paidValue),
      notes: clientNotes.trim(),
    };

    if (editingClient) {
      setClients((current) =>
        current.map((item) =>
          item.id === editingClient.id ? { ...item, ...clientData } : item
        )
      );
    } else {
      const newClient: Client = {
        id: Date.now(),
        ...clientData,
        date: new Date().toISOString(),
      };

      setClients((current) => [newClient, ...current]);
    }

    resetClientForm();
  }

  function deleteClient(id: number) {
    if (!window.confirm('Delete this client record?')) return;

    setClients((current) => current.filter((item) => item.id !== id));
  }

  // ============================================
  // RENDER
  // ============================================

  return (
    <div className='min-h-screen bg-[#090d18] text-slate-100 md:flex'>
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

            return (
              <button
                key={item.name}
                onClick={() => setActive(item.name)}
                className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                  active === item.name
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
          <p className='mt-2 text-2xl font-bold'>{money(MONTHLY_TARGET)}</p>

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

      <main className='min-w-0 flex-1 p-5 md:p-8'>
        <header className='mb-8 flex flex-wrap items-center justify-between gap-4'>
          <div>
            <p className='text-sm text-slate-500'>Your workspace</p>
            <h2 className='mt-1 text-2xl font-bold'>{active}</h2>
          </div>

          {active === 'Overview' || active === 'Income Tracker' ? (
            <PrimaryButton onClick={() => setShowIncomeForm(true)}>
              <Plus size={18} />
              Record income
            </PrimaryButton>
          ) : active === 'Clients' ? (
            <PrimaryButton onClick={openNewClientForm}>
              <Plus size={18} />
              Add client
            </PrimaryButton>
          ) : active === 'Applications' ? (
            <PrimaryButton onClick={openNewApplicationForm}>
              <Plus size={18} />
              Add application
            </PrimaryButton>
          ) : null}
        </header>

        {/* OVERVIEW */}

        {active === 'Overview' && (
          <>
            <div className='mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
              <StatCard
                title='Monthly earnings'
                value={money(total)}
                icon={Wallet}
                detail='Income recorded this month'
              />

              <StatCard
                title='Client revenue'
                value={money(totalClientPaid)}
                icon={CircleDollarSign}
                detail='Payments received from clients'
              />

              <StatCard
                title='Outstanding payments'
                value={money(outstandingBalance)}
                icon={TrendingUp}
                detail='Remaining client balances'
              />

              <StatCard
                title='Active applications'
                value={String(activeApplications)}
                icon={BriefcaseBusiness}
                detail='Applications in progress'
              />
            </div>

            <IncomeProgress total={total} progress={progress} />

            <div className='mb-6 grid gap-4 sm:grid-cols-3'>
              <StatCard
                title='Total clients'
                value={String(clients.length)}
                icon={Users}
                detail='Clients in your workspace'
              />

              <StatCard
                title='Total applications'
                value={String(applications.length)}
                icon={BriefcaseBusiness}
                detail='Job opportunities tracked'
              />

              <StatCard
                title='Saved opportunities'
                value={String(savedOpportunities.length)}
                icon={Bookmark}
                detail='Platforms saved for later'
              />
            </div>

            <div className='grid gap-6 xl:grid-cols-2'>
              <ActivityCard
                title='Recent income'
                subtitle='Your latest recorded earnings'
                onViewAll={() => setActive('Income Tracker')}
                empty={incomes.length === 0}
              >
                {incomes.slice(0, 5).map((item) => (
                  <div
                    key={item.id}
                    className='flex items-center justify-between gap-3 rounded-xl bg-slate-800/50 p-3'
                  >
                    <div>
                      <p className='text-sm font-medium'>{item.source}</p>
                      <p className='mt-1 text-xs text-slate-500'>
                        {new Date(item.date).toLocaleDateString()}
                      </p>
                    </div>

                    <span className='text-sm font-semibold text-emerald-400'>
                      +{money(item.amount)}
                    </span>
                  </div>
                ))}
              </ActivityCard>

              <ActivityCard
                title='Recent clients'
                subtitle='Latest client relationships'
                onViewAll={() => setActive('Clients')}
                empty={clients.length === 0}
              >
                {clients.slice(0, 5).map((client) => (
                  <div
                    key={client.id}
                    className='flex items-center justify-between gap-3 rounded-xl bg-slate-800/50 p-3'
                  >
                    <div>
                      <p className='text-sm font-medium'>{client.name}</p>
                      <p className='mt-1 text-xs text-slate-500'>
                        {client.service}
                      </p>
                    </div>

                    <StatusBadge status={client.status} />
                  </div>
                ))}
              </ActivityCard>

              <ActivityCard
                title='Recent applications'
                subtitle='Your job search progress'
                onViewAll={() => setActive('Applications')}
                empty={applications.length === 0}
                wide
              >
                {applications.slice(0, 5).map((item) => (
                  <div
                    key={item.id}
                    className='flex flex-wrap items-center justify-between gap-3 rounded-xl bg-slate-800/50 p-4'
                  >
                    <div>
                      <p className='text-sm font-medium'>{item.role}</p>
                      <p className='mt-1 text-xs text-slate-500'>
                        {item.company} ·{' '}
                        {item.platform || 'Platform not specified'}
                      </p>
                    </div>

                    <StatusBadge status={item.status} />
                  </div>
                ))}
              </ActivityCard>
            </div>
          </>
        )}

        {/* INCOME TRACKER */}

        {active === 'Income Tracker' && (
          <>
            <div className='mb-6 grid gap-4 sm:grid-cols-3'>
              <StatCard
                title='Monthly earnings'
                value={money(total)}
                icon={Wallet}
                detail='Recorded this month'
              />

              <StatCard
                title='Monthly target'
                value={money(MONTHLY_TARGET)}
                icon={Target}
                detail='Your financial goal'
              />

              <StatCard
                title='Target remaining'
                value={money(Math.max(MONTHLY_TARGET - total, 0))}
                icon={TrendingUp}
                detail='Amount left to reach goal'
              />
            </div>

            <IncomeProgress total={total} progress={progress} />

            <section className='rounded-2xl border border-slate-800 bg-[#111a2c] p-6'>
              <div className='mb-5 flex items-center justify-between'>
                <h3 className='font-semibold'>Income history</h3>
                <span className='text-xs text-slate-500'>
                  {monthlyIncomes.length} records this month
                </span>
              </div>

              {monthlyIncomes.length === 0 ? (
                <EmptyState
                  icon={Wallet}
                  title='No income recorded yet'
                  description='Record your first payment when you earn it.'
                />
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

                        <IconButton
                          label='Delete income record'
                          onClick={() => removeIncome(item.id)}
                        >
                          <X size={17} />
                        </IconButton>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </>
        )}

        {/* OPPORTUNITIES */}

        {active === 'Opportunities' && (
          <section>
            <div className='mb-6 rounded-2xl border border-slate-800 bg-[#111a2c] p-5'>
              <div className='relative'>
                <Search
                  className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-500'
                  size={19}
                />

                <input
                  value={opportunitySearch}
                  onChange={(e) => setOpportunitySearch(e.target.value)}
                  placeholder='Search opportunities...'
                  className={`${fieldClass} pl-12`}
                />
              </div>

              <div className='mt-4 flex flex-wrap gap-2'>
                {[
                  'All',
                  'Freelancing',
                  'Remote Jobs',
                  'AI Training',
                  'Saved',
                ].map((filter) => (
                  <FilterButton
                    key={filter}
                    active={opportunityFilter === filter}
                    onClick={() => setOpportunityFilter(filter)}
                  >
                    {filter}
                    {filter === 'Saved' && ` (${savedOpportunities.length})`}
                  </FilterButton>
                ))}
              </div>
            </div>

            <SectionHeading
              title='Explore opportunities'
              description='Discover platforms where you can find work and earn online.'
              count={`${filteredOpportunities.length} results`}
            />

            {filteredOpportunities.length === 0 ? (
              <EmptyState
                icon={Search}
                title='No opportunities found'
                description='Try another search or category.'
              />
            ) : (
              <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
                {filteredOpportunities.map((item) => {
                  const Icon = item.icon;
                  const isSaved = savedOpportunities.includes(item.id);

                  return (
                    <div
                      key={item.id}
                      className='rounded-2xl border border-slate-800 bg-[#111a2c] p-5 transition hover:border-indigo-500'
                    >
                      <div className='mb-5 flex items-center justify-between'>
                        <div className='rounded-xl bg-indigo-500/10 p-3 text-indigo-400'>
                          <Icon size={24} />
                        </div>

                        <IconButton
                          label={
                            isSaved
                              ? 'Remove saved opportunity'
                              : 'Save opportunity'
                          }
                          onClick={() => toggleSavedOpportunity(item.id)}
                          active={isSaved}
                        >
                          <Bookmark
                            size={20}
                            fill={isSaved ? 'currentColor' : 'none'}
                          />
                        </IconButton>
                      </div>

                      <h3 className='font-semibold'>{item.name}</h3>
                      <p className='mt-1 text-sm text-slate-500'>
                        {item.category}
                      </p>

                      <a
                        href={item.url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='mt-5 inline-flex items-center gap-2 text-sm font-medium text-indigo-400 hover:text-indigo-300'
                      >
                        Visit platform
                        <ArrowUpRight size={16} />
                      </a>
                    </div>
                  );
                })}
              </div>
            )}

            <p className='mt-6 text-xs text-slate-500'>
              These are platform links, not verified live job listings. Check
              each platform's eligibility requirements and available
              opportunities.
            </p>
          </section>
        )}

        {/* APPLICATIONS */}

        {active === 'Applications' && (
          <section>
            <div className='mb-6 grid gap-4 sm:grid-cols-3'>
              <StatCard
                title='Total applications'
                value={String(applications.length)}
                icon={BriefcaseBusiness}
                detail='All tracked applications'
              />

              <StatCard
                title='Interviews'
                value={String(
                  applications.filter((item) => item.status === 'Interview')
                    .length
                )}
                icon={Users}
                detail='Interview opportunities'
              />

              <StatCard
                title='Accepted'
                value={String(
                  applications.filter((item) => item.status === 'Accepted')
                    .length
                )}
                icon={TrendingUp}
                detail='Successful applications'
              />
            </div>

            <div className='mb-6 rounded-2xl border border-slate-800 bg-[#111a2c] p-5'>
              <div className='relative'>
                <Search
                  size={18}
                  className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-500'
                />

                <input
                  value={applicationSearch}
                  onChange={(e) => setApplicationSearch(e.target.value)}
                  placeholder='Search company, role or platform...'
                  className={`${fieldClass} pl-11`}
                />
              </div>

              <div className='mt-4 flex flex-wrap gap-2'>
                {['All', ...applicationStatuses].map((status) => (
                  <FilterButton
                    key={status}
                    active={applicationFilter === status}
                    onClick={() => setApplicationFilter(status)}
                  >
                    {status}
                  </FilterButton>
                ))}
              </div>
            </div>

            <SectionHeading
              title='Your applications'
              description='Track your job search and follow-up progress.'
              count={`${filteredApplications.length} applications`}
            />

            {filteredApplications.length === 0 ? (
              <EmptyState
                icon={BriefcaseBusiness}
                title='No applications found'
                description='Add your first job application to start tracking progress.'
              />
            ) : (
              <div className='grid gap-4 xl:grid-cols-2'>
                {filteredApplications.map((item) => (
                  <div
                    key={item.id}
                    className='rounded-2xl border border-slate-800 bg-[#111a2c] p-5'
                  >
                    <div className='flex flex-wrap items-start justify-between gap-3'>
                      <div>
                        <h3 className='font-semibold'>{item.role}</h3>
                        <p className='mt-1 text-sm text-slate-400'>
                          {item.company}
                        </p>
                      </div>

                      <StatusBadge status={item.status} />
                    </div>

                    <div className='mt-4 space-y-2 text-sm text-slate-500'>
                      <p>Platform: {item.platform || 'Not specified'}</p>
                      <p>Added: {new Date(item.date).toLocaleDateString()}</p>
                    </div>

                    {item.notes && (
                      <p className='mt-4 border-t border-slate-800 pt-3 text-sm text-slate-400'>
                        {item.notes}
                      </p>
                    )}

                    <div className='mt-5 flex justify-end gap-2 border-t border-slate-800 pt-4'>
                      <button
                        onClick={() => openEditApplicationForm(item)}
                        className='flex items-center gap-2 rounded-lg bg-slate-800 px-3 py-2 text-xs hover:bg-slate-700'
                      >
                        <Pencil size={14} />
                        Edit
                      </button>

                      <IconButton
                        label={`Delete ${item.company} application`}
                        onClick={() => deleteApplication(item.id)}
                      >
                        <X size={17} />
                      </IconButton>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* CLIENTS */}

        {active === 'Clients' && (
          <section>
            <div className='mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
              <StatCard
                title='Total clients'
                value={String(clients.length)}
                icon={Users}
                detail='Clients in your workspace'
              />

              <StatCard
                title='Total project value'
                value={money(totalClientValue)}
                icon={CircleDollarSign}
                detail='Agreed project amounts'
              />

              <StatCard
                title='Outstanding balance'
                value={money(outstandingBalance)}
                icon={Wallet}
                detail='Payments still expected'
              />
            </div>

            <div className='mb-6 rounded-2xl border border-slate-800 bg-[#111a2c] p-5'>
              <div className='relative'>
                <Search
                  size={18}
                  className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-500'
                />

                <input
                  value={clientSearch}
                  onChange={(e) => setClientSearch(e.target.value)}
                  placeholder='Search client, business, email or service...'
                  className={`${fieldClass} pl-11`}
                />
              </div>

              <div className='mt-4 flex flex-wrap gap-2'>
                {['All', ...paymentStatuses].map((status) => (
                  <FilterButton
                    key={status}
                    active={clientFilter === status}
                    onClick={() => setClientFilter(status)}
                  >
                    {status}
                  </FilterButton>
                ))}
              </div>
            </div>

            <SectionHeading
              title='Your clients'
              description='Manage client relationships and project payments.'
              count={`${filteredClients.length} clients`}
            />

            {filteredClients.length === 0 ? (
              <EmptyState
                icon={Users}
                title='No clients found'
                description='Add your first client to manage projects and payments.'
              />
            ) : (
              <div className='grid gap-4 xl:grid-cols-2'>
                {filteredClients.map((client) => {
                  const balance = client.amount - client.paid;
                  const paymentProgress =
                    client.amount > 0
                      ? Math.min((client.paid / client.amount) * 100, 100)
                      : 0;

                  return (
                    <div
                      key={client.id}
                      className='rounded-2xl border border-slate-800 bg-[#111a2c] p-5'
                    >
                      <div className='flex flex-wrap items-start justify-between gap-3'>
                        <div className='flex items-center gap-3'>
                          <div className='flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400'>
                            <Users size={21} />
                          </div>

                          <div>
                            <h3 className='font-semibold'>{client.name}</h3>
                            <p className='text-sm text-slate-500'>
                              {client.business || 'Independent client'}
                            </p>
                          </div>
                        </div>

                        <StatusBadge status={client.status} />
                      </div>

                      <div className='mt-5 space-y-2 text-sm text-slate-400'>
                        {client.email && (
                          <p className='flex items-center gap-2'>
                            <Mail size={15} />
                            {client.email}
                          </p>
                        )}

                        {client.phone && (
                          <p className='flex items-center gap-2'>
                            <Phone size={15} />
                            {client.phone}
                          </p>
                        )}

                        <p className='text-slate-300'>
                          Service: {client.service}
                        </p>
                      </div>

                      <div className='mt-5 border-t border-slate-800 pt-4'>
                        <div className='mb-2 flex justify-between text-sm'>
                          <span className='text-slate-400'>
                            Payment progress
                          </span>
                          <span className='font-medium'>
                            {paymentProgress.toFixed(0)}%
                          </span>
                        </div>

                        <div className='h-2 overflow-hidden rounded-full bg-slate-800'>
                          <div
                            className='h-full rounded-full bg-emerald-500'
                            style={{ width: `${paymentProgress}%` }}
                          />
                        </div>

                        <div className='mt-4 grid grid-cols-2 gap-3'>
                          <div>
                            <p className='text-xs text-slate-500'>
                              Project value
                            </p>
                            <p className='mt-1 font-semibold'>
                              {money(client.amount)}
                            </p>
                          </div>

                          <div>
                            <p className='text-xs text-slate-500'>Paid</p>
                            <p className='mt-1 font-semibold text-emerald-400'>
                              {money(client.paid)}
                            </p>
                          </div>

                          <div className='col-span-2'>
                            <p className='text-xs text-slate-500'>
                              Outstanding balance
                            </p>
                            <p className='mt-1 font-semibold'>
                              {money(balance)}
                            </p>
                          </div>
                        </div>
                      </div>

                      {client.notes && (
                        <p className='mt-4 border-t border-slate-800 pt-3 text-sm text-slate-400'>
                          {client.notes}
                        </p>
                      )}

                      <div className='mt-5 flex items-center justify-between border-t border-slate-800 pt-4'>
                        <p className='text-xs text-slate-500'>
                          Added {new Date(client.date).toLocaleDateString()}
                        </p>

                        <div className='flex gap-2'>
                          <button
                            onClick={() => openEditClientForm(client)}
                            className='flex items-center gap-2 rounded-lg bg-slate-800 px-3 py-2 text-xs hover:bg-slate-700'
                          >
                            <Pencil size={14} />
                            Edit
                          </button>

                          <IconButton
                            label={`Delete ${client.name}`}
                            onClick={() => deleteClient(client.id)}
                          >
                            <X size={17} />
                          </IconButton>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <p className='mt-6 text-xs text-slate-500'>
              Client and payment records are currently stored in this browser.
              They are not synchronized across devices.
            </p>
          </section>
        )}

        <footer className='mt-8 text-center text-xs text-slate-600'>
          AI Income Hub · Your online income workspace
        </footer>
      </main>

      {/* INCOME MODAL */}

      {showIncomeForm && (
        <Modal
          title='Record new income'
          onClose={() => setShowIncomeForm(false)}
        >
          <form onSubmit={addIncome}>
            <FormField label='Income source'>
              <input
                required
                value={incomeSource}
                onChange={(e) => setIncomeSource(e.target.value)}
                placeholder='e.g. Website development'
                className={fieldClass}
              />
            </FormField>

            <FormField label='Amount (KES)'>
              <input
                required
                type='number'
                min='1'
                step='0.01'
                value={incomeAmount}
                onChange={(e) => setIncomeAmount(e.target.value)}
                placeholder='e.g. 15000'
                className={fieldClass}
              />
            </FormField>

            <ModalActions
              onCancel={() => setShowIncomeForm(false)}
              submitLabel='Save income'
            />
          </form>
        </Modal>
      )}

      {/* APPLICATION MODAL */}

      {showApplicationForm && (
        <Modal
          title={editingApplication ? 'Edit application' : 'New application'}
          onClose={resetApplicationForm}
        >
          <form onSubmit={saveApplication}>
            <FormField label='Company name *'>
              <input
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder='e.g. Microsoft'
                className={fieldClass}
              />
            </FormField>

            <FormField label='Job title *'>
              <input
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder='e.g. Junior Frontend Developer'
                className={fieldClass}
              />
            </FormField>

            <FormField label='Platform'>
              <input
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                placeholder='e.g. LinkedIn'
                className={fieldClass}
              />
            </FormField>

            <FormField label='Application status'>
              <select
                value={applicationStatus}
                onChange={(e) =>
                  setApplicationStatus(e.target.value as ApplicationStatus)
                }
                className={fieldClass}
              >
                {applicationStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label='Notes'>
              <textarea
                value={applicationNotes}
                onChange={(e) => setApplicationNotes(e.target.value)}
                placeholder='Interview dates, follow-ups or other details...'
                rows={3}
                className={`${fieldClass} resize-none`}
              />
            </FormField>

            <ModalActions
              onCancel={resetApplicationForm}
              submitLabel={
                editingApplication ? 'Update application' : 'Save application'
              }
            />
          </form>
        </Modal>
      )}

      {/* CLIENT MODAL */}

      {showClientForm && (
        <Modal
          title={editingClient ? 'Edit client' : 'Add new client'}
          onClose={resetClientForm}
        >
          <form onSubmit={saveClient}>
            <FormField label='Client name *'>
              <input
                required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder='e.g. John Kamau'
                className={fieldClass}
              />
            </FormField>

            <FormField label='Business name'>
              <input
                value={clientBusiness}
                onChange={(e) => setClientBusiness(e.target.value)}
                placeholder='e.g. Kamau Designs'
                className={fieldClass}
              />
            </FormField>

            <div className='grid gap-4 sm:grid-cols-2'>
              <FormField label='Email'>
                <input
                  type='email'
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder='client@example.com'
                  className={fieldClass}
                />
              </FormField>

              <FormField label='Phone'>
                <input
                  type='tel'
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder='+254...'
                  className={fieldClass}
                />
              </FormField>
            </div>

            <FormField label='Service / Project *'>
              <input
                required
                value={clientService}
                onChange={(e) => setClientService(e.target.value)}
                placeholder='e.g. Business website development'
                className={fieldClass}
              />
            </FormField>

            <div className='grid gap-4 sm:grid-cols-2'>
              <FormField label='Agreed amount (KES) *'>
                <input
                  required
                  type='number'
                  min='1'
                  step='0.01'
                  value={clientAmount}
                  onChange={(e) => setClientAmount(e.target.value)}
                  placeholder='e.g. 25000'
                  className={fieldClass}
                />
              </FormField>

              <FormField label='Amount paid (KES)'>
                <input
                  type='number'
                  min='0'
                  step='0.01'
                  value={clientPaid}
                  onChange={(e) => setClientPaid(e.target.value)}
                  placeholder='e.g. 10000'
                  className={fieldClass}
                />
              </FormField>
            </div>

            <FormField label='Notes'>
              <textarea
                value={clientNotes}
                onChange={(e) => setClientNotes(e.target.value)}
                placeholder='Project details, deadlines or follow-up notes...'
                rows={3}
                className={`${fieldClass} resize-none`}
              />
            </FormField>

            <p className='mb-5 text-xs text-slate-500'>
              Payment status is calculated automatically from the agreed amount
              and amount paid.
            </p>

            <ModalActions
              onCancel={resetClientForm}
              submitLabel={editingClient ? 'Update client' : 'Save client'}
            />
          </form>
        </Modal>
      )}
    </div>
  );
}

// ============================================
// REUSABLE COMPONENTS
// ============================================

function PrimaryButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className='flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold hover:bg-indigo-500'
    >
      {children}
    </button>
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

function IncomeProgress({
  total,
  progress,
}: {
  total: number;
  progress: number;
}) {
  return (
    <section className='mb-6 rounded-2xl border border-slate-800 bg-[#111a2c] p-6'>
      <div className='flex flex-wrap justify-between gap-4'>
        <div>
          <p className='text-sm text-slate-400'>Monthly income target</p>
          <h3 className='mt-2 text-3xl font-bold'>{money(total)}</h3>
          <p className='mt-1 text-sm text-slate-500'>
            Target: {money(MONTHLY_TARGET)}
          </p>
        </div>

        <div className='h-fit rounded-xl bg-indigo-500/10 p-3 text-indigo-400'>
          <Target size={25} />
        </div>
      </div>

      <div className='mt-6 h-3 overflow-hidden rounded-full bg-slate-800'>
        <div
          className='h-full rounded-full bg-indigo-500 transition-all'
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className='mt-3 flex justify-between text-xs text-slate-500'>
        <span>{progress.toFixed(1)}% achieved</span>
        <span>{money(Math.max(MONTHLY_TARGET - total, 0))} remaining</span>
      </div>
    </section>
  );
}

function ActivityCard({
  title,
  subtitle,
  onViewAll,
  empty,
  wide = false,
  children,
}: {
  title: string;
  subtitle: string;
  onViewAll: () => void;
  empty: boolean;
  wide?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      className={`rounded-2xl border border-slate-800 bg-[#111a2c] p-6 ${
        wide ? 'xl:col-span-2' : ''
      }`}
    >
      <div className='mb-5 flex items-center justify-between'>
        <div>
          <h3 className='font-semibold'>{title}</h3>
          <p className='mt-1 text-xs text-slate-500'>{subtitle}</p>
        </div>

        <button
          onClick={onViewAll}
          className='text-xs font-medium text-indigo-400 hover:text-indigo-300'
        >
          View all
        </button>
      </div>

      {empty ? (
        <p className='py-8 text-center text-sm text-slate-500'>
          Nothing recorded yet.
        </p>
      ) : (
        <div className='space-y-3'>{children}</div>
      )}
    </section>
  );
}

function FormField({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className='mb-4'>
      <label className='mb-2 block text-sm text-slate-400'>{label}</label>
      {children}
    </div>
  );
}

function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4'>
      <div className='my-auto w-full max-w-lg rounded-2xl border border-slate-700 bg-[#111a2c] p-6'>
        <div className='mb-6 flex items-center justify-between'>
          <h3 className='text-lg font-bold'>{title}</h3>

          <button
            type='button'
            onClick={onClose}
            aria-label='Close form'
            className='text-slate-400 hover:text-white'
          >
            <X />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}

function ModalActions({
  onCancel,
  submitLabel,
}: {
  onCancel: () => void;
  submitLabel: string;
}) {
  return (
    <div className='flex gap-3'>
      <button
        type='button'
        onClick={onCancel}
        className='flex-1 rounded-xl bg-slate-800 p-3 text-sm font-semibold hover:bg-slate-700'
      >
        Cancel
      </button>

      <button
        type='submit'
        className='flex-1 rounded-xl bg-indigo-600 p-3 text-sm font-semibold hover:bg-indigo-500'
      >
        {submitLabel}
      </button>
    </div>
  );
}

function EmptyState({
  icon: Icon,
  title,
  description,
}: {
  icon: ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className='rounded-2xl border border-slate-800 bg-[#111a2c] p-12 text-center'>
      <Icon size={35} className='mx-auto mb-3 text-slate-500' />
      <h3 className='font-semibold'>{title}</h3>
      <p className='mt-2 text-sm text-slate-500'>{description}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`rounded-lg px-3 py-2 text-xs font-medium ${statusStyle(status)}`}
    >
      {status}
    </span>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-xl px-4 py-2 text-sm transition ${
        active
          ? 'bg-indigo-600 text-white'
          : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
      }`}
    >
      {children}
    </button>
  );
}

function SectionHeading({
  title,
  description,
  count,
}: {
  title: string;
  description: string;
  count: string;
}) {
  return (
    <div className='mb-5 flex items-center justify-between gap-3'>
      <div>
        <h3 className='font-semibold'>{title}</h3>
        <p className='mt-1 text-sm text-slate-500'>{description}</p>
      </div>

      <span className='shrink-0 text-xs text-slate-500'>{count}</span>
    </div>
  );
}

function IconButton({
  label,
  onClick,
  active = false,
  children,
}: {
  label: string;
  onClick: () => void;
  active?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type='button'
      onClick={onClick}
      aria-label={label}
      className={`rounded-lg p-2 transition ${
        active
          ? 'bg-indigo-500/10 text-indigo-400'
          : 'bg-slate-800 text-slate-400 hover:text-white'
      }`}
    >
      {children}
    </button>
  );
}

export default App;
