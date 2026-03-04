import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Search as SearchIcon, Pill, Filter, ArrowUpRight } from 'lucide-react';
import { Button } from '../components/ui/button';

// Mock database of medicines
const MEDICINE_DATABASE = [
  { id: 'amoxicillin-500mg', name: "Amoxicillin 500mg", salt: "Amoxicillin", type: "Antibiotic", price: "$12.99", match: "98%", manufacturer: "PharmaCorp" },
  { id: 'augmentin-625-duo', name: "Augmentin 625 Duo", salt: "Amoxicillin + Clavulanic Acid", type: "Antibiotic", price: "$18.50", match: "85%", manufacturer: "GSK" },
  { id: 'moxikind-cv-625', name: "Moxikind-CV 625", salt: "Amoxicillin + Clavulanic Acid", type: "Antibiotic", price: "$15.00", match: "82%", manufacturer: "Mankind" },
  { id: 'ibuprofen-400mg', name: "Ibuprofen 400mg", salt: "Ibuprofen", type: "Pain Reliever", price: "$8.99", match: "95%", manufacturer: "HealthCare Inc" },
  { id: 'advil-200mg', name: "Advil 200mg", salt: "Ibuprofen", type: "Pain Reliever", price: "$11.99", match: "90%", manufacturer: "Pfizer" },
  { id: 'paracetamol-500mg', name: "Paracetamol 500mg", salt: "Paracetamol", type: "Pain Reliever", price: "$5.50", match: "99%", manufacturer: "Generic" },
  { id: 'tylenol-500mg', name: "Tylenol 500mg", salt: "Paracetamol", type: "Pain Reliever", price: "$9.50", match: "94%", manufacturer: "J&J" },
  { id: 'cetirizine-10mg', name: "Cetirizine 10mg", salt: "Cetirizine", type: "Antihistamine", price: "$6.20", match: "92%", manufacturer: "AllergyMeds" },
  { id: 'zyrtec-10mg', name: "Zyrtec 10mg", salt: "Cetirizine", type: "Antihistamine", price: "$14.20", match: "88%", manufacturer: "J&J" },
  { id: 'azithromycin-250mg', name: "Azithromycin 250mg", salt: "Azithromycin", type: "Antibiotic", price: "$14.00", match: "88%", manufacturer: "Zithro" },
  { id: 'omeprazole-20mg', name: "Omeprazole 20mg", salt: "Omeprazole", type: "Antacid", price: "$10.50", match: "96%", manufacturer: "GastroHealth" },
  { id: 'metformin-500mg', name: "Metformin 500mg", salt: "Metformin", type: "Anti-diabetic", price: "$4.00", match: "97%", manufacturer: "DiabCare" },
];

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState(MEDICINE_DATABASE);

  useEffect(() => {
    const q = searchParams.get('q') || '';
    setQuery(q);

    if (q.trim() === '') {
      setResults(MEDICINE_DATABASE);
    } else {
      const lowerQ = q.toLowerCase();
      const filtered = MEDICINE_DATABASE.filter(med =>
        med.name.toLowerCase().includes(lowerQ) ||
        med.salt.toLowerCase().includes(lowerQ) ||
        med.type.toLowerCase().includes(lowerQ)
      );
      setResults(filtered);
    }
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ q: query });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Search Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-6">
            <Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
            <span className="text-gray-600">/</span>
            <span className="text-cyan-400 font-medium">Search Engine</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Medical <span className="text-gradient">Search Engine</span>
          </h1>

          <form onSubmit={handleSearch} className="relative group interactive">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-green-400 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500" />
            <div className="relative glass-panel rounded-2xl p-2 flex items-center bg-[#0a1526]/80 backdrop-blur-xl border border-white/10">
              <div className="pl-4 pr-2 text-gray-400">
                <SearchIcon className="w-6 h-6" />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by medicine name, salt, or category (e.g., Antibiotic)..."
                className="w-full bg-transparent border-none outline-none text-white placeholder-gray-500 py-4 text-lg"
              />
              <Button type="submit" className="px-6 py-4 rounded-xl font-semibold flex items-center gap-2 h-auto">
                Search
              </Button>
            </div>
          </form>
        </motion.div>

        {/* Results Section */}
        <div className="grid md:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:block col-span-1 space-y-6"
          >
            <div className="glass-panel rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/10">
                <Filter className="w-5 h-5 text-cyan-400" />
                <h3 className="font-semibold text-white">Filters</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-3">Category</h4>
                  <div className="space-y-2">
                    {['Antibiotic', 'Pain Reliever', 'Antihistamine', 'Antacid'].map(cat => (
                      <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                        <div className="w-4 h-4 rounded border border-white/20 group-hover:border-cyan-400 transition-colors flex items-center justify-center">
                          {/* Checked state would go here */}
                        </div>
                        <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Results List */}
          <div className="col-span-1 md:col-span-3">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-400">
                Found <span className="text-white font-semibold">{results.length}</span> results {searchParams.get('q') ? `for "${searchParams.get('q')}"` : ''}
              </p>
            </div>

            {results.length > 0 ? (
              <div className="space-y-4">
                {results.map((result, i) => (
                  <motion.div
                    key={result.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    onClick={() => navigate(`/medicine/${result.id}`)}
                    className="glass-card rounded-2xl p-6 hover:bg-white/5 transition-all cursor-pointer group border border-white/5 hover:border-cyan-500/30"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                          <Pill className="w-6 h-6 text-cyan-400" />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">{result.name}</h3>
                            <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] text-gray-300 uppercase tracking-wider">
                              {result.type}
                            </span>
                          </div>
                          <p className="text-sm text-gray-400 mb-2">Salt: <span className="text-gray-300">{result.salt}</span></p>
                          <p className="text-xs text-gray-500">Mfr: {result.manufacturer}</p>
                        </div>
                      </div>

                      <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center border-t border-white/5 md:border-t-0 pt-4 md:pt-0">
                        <div className="text-2xl font-bold text-white mb-1">{result.price}</div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-green-400 bg-green-400/10 px-2 py-1 rounded-full">
                            {result.match} AI Match
                          </span>
                          <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-cyan-400 transition-colors" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-panel rounded-3xl p-12 text-center flex flex-col items-center justify-center"
              >
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                  <SearchIcon className="w-10 h-10 text-gray-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">No medicines found</h3>
                <p className="text-gray-400 max-w-md mx-auto">
                  We couldn't find any matches for "{query}". Try checking for typos or searching by active ingredient (salt) instead.
                </p>
                <Button
                  onClick={() => {
                    setQuery('');
                    setSearchParams({});
                  }}
                  variant="outline"
                  className="mt-8"
                >
                  Clear Search
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
