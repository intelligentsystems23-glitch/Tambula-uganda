import React from 'react';
import { X, Calendar, Users, CheckCircle2, ArrowRight } from 'lucide-react';
import { GROUP_DEPARTURES } from '../data/safariData';
import { CurrencyCode, GroupDeparture } from '../types';
import { formatPrice } from '../utils/currency';

interface GroupDeparturesModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency: CurrencyCode;
  onSelectDeparture: (departure: GroupDeparture) => void;
}

export const GroupDeparturesModal: React.FC<GroupDeparturesModalProps> = ({
  isOpen,
  onClose,
  currency,
  onSelectDeparture,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        id="group-departures-modal-container"
        className="bg-[#faf8f5] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl border border-[#ded5c7] flex flex-col"
      >
        {/* Header */}
        <div className="bg-[#0e2117] text-white p-6 rounded-t-2xl flex items-center justify-between border-b border-white/10">
          <div>
            <span className="text-[#ee5f27] text-xs font-bold tracking-widest uppercase block">
              2026 – 2027 CONFIRMED EXPEDITIONS
            </span>
            <h2 className="font-display text-2xl font-bold text-white mt-1">
              Scheduled Small Group Safaris
            </h2>
            <p className="text-xs text-white/70">
              Guaranteed window seats, max 6–7 travelers per Land Cruiser, licensed senior naturalists.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Departures List */}
        <div className="p-6 sm:p-8 space-y-4">
          {GROUP_DEPARTURES.map((dep) => (
            <div
              key={dep.id}
              className="bg-white rounded-xl p-5 border border-[#e2d8ca] shadow-2xs hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-2 max-w-xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                      dep.status === 'Guaranteed'
                        ? 'bg-[#e8efe8] text-[#048310]'
                        : dep.status === 'Filling Fast'
                        ? 'bg-[#fdf2ec] text-[#ee5f27]'
                        : 'bg-[#f1ede6] text-[#4d5950]'
                    }`}
                  >
                    ● {dep.status}
                  </span>
                  <span className="text-xs text-[#707e74] flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{dep.startDate} — {dep.endDate}</span>
                  </span>
                </div>

                <h3 className="font-display text-lg font-bold text-[#102419]">
                  {dep.title}
                </h3>

                <p className="text-xs text-[#556459] font-medium">
                  {dep.route}
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  {dep.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="bg-[#faf7f2] text-[#49564c] border border-[#eee4d6] text-[11px] px-2 py-0.5 rounded"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* Price & Action */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-4 sm:pt-0 border-[#eee7db] shrink-0 gap-3">
                <div className="text-left sm:text-right">
                  <span className="text-xl font-bold font-display text-[#102419] block">
                    {formatPrice(dep.priceUSD, currency)}
                  </span>
                  <span className="text-[11px] text-[#6b7b70]">
                    per person · {dep.spotsLeft} spots remaining
                  </span>
                </div>

                <button
                  onClick={() => onSelectDeparture(dep)}
                  className="inline-flex items-center gap-1.5 bg-[#0e2117] hover:bg-[#1a3828] text-white px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all shadow-xs"
                >
                  <span>Reserve Seat</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#ee5f27]" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-6 bg-[#f4eee5] border-t border-[#e5dcce] rounded-b-2xl flex items-center justify-between text-xs text-[#526055]">
          <span>Single supplement accommodation upgrades available on all circuits.</span>
          <button
            onClick={onClose}
            className="text-xs font-semibold text-[#102419] hover:underline"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
