'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { UploadCloud, FileSpreadsheet, File as FileIcon, CreditCard, Search, CheckCircle2 } from 'lucide-react';
import { PortalFormData } from '../../../types';
import { PROVIDERS } from '../../../lib/data';
import StepHeader from '../ui/StepHeader';

interface SmartUploadStepProps {
  data: PortalFormData;
  updateData: (data: Partial<PortalFormData>) => void;
  onFinish: () => void;
}

const SmartUploadStep: React.FC<SmartUploadStepProps> = ({ data, updateData }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [search, setSearch] = useState('');

  const filteredProviders = useMemo(
    () => PROVIDERS.filter(p => p.name.toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  const handleDrop = useCallback((e: React.DragEvent, field: 'dataFile' | 'pdfFile') => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      updateData({ [field]: e.dataTransfer.files[0] });
    }
  }, [updateData]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handlePrimaryUploadClick = useCallback(() => {
    document.getElementById('primary-upload')?.click();
  }, []);

  const handlePdfUploadClick = useCallback(() => {
    document.getElementById('pdf-upload')?.click();
  }, []);

  return (
    <div className="animate-in slide-in-from-right-4 fade-in duration-300 h-full flex flex-col">
      <StepHeader
        title="Dateien bereitstellen"
        description="Laden Sie Ihre Export-Datei hoch und wählen Sie die Quelle."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-grow">

          {/* Left Column: Uploads */}
          <div className="space-y-4">
               {/* Primary Upload */}
              <div
                className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer h-64 flex flex-col items-center justify-center ${
                  data.dataFile
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/10'
                    : isDragging
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10 scale-[1.02]'
                      : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:border-primary-400 hover:bg-white dark:hover:bg-slate-800'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, 'dataFile')}
                onClick={handlePrimaryUploadClick}
              >
                <input
                  type="file"
                  id="primary-upload"
                  className="hidden"
                  accept=".csv,.xml,.mt940,.xls,.xlsx"
                  onChange={(e) => e.target.files && updateData({ dataFile: e.target.files[0] })}
                />

                {data.dataFile ? (
                  <div className="flex flex-col items-center text-green-600 dark:text-green-400 animate-in zoom-in duration-300">
                    <FileSpreadsheet size={48} className="mb-4" />
                    <span className="font-bold text-lg mb-1">{data.dataFile.name}</span>
                    <span className="text-sm opacity-70 mb-4">{(data.dataFile.size / 1024).toFixed(1)} KB</span>
                    <span className="px-3 py-1 bg-white dark:bg-slate-900 rounded-full text-xs font-bold border border-green-200 dark:border-green-800">Datei ändern</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-slate-500 dark:text-slate-400">
                    <div className="w-16 h-16 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center mb-4 shadow-sm">
                        <UploadCloud size={32} className="text-primary-500" />
                    </div>
                    <span className="font-bold text-lg text-slate-900 dark:text-white mb-2">Export hier ablegen</span>
                    <span className="text-sm max-w-[200px]">CSV, MT940 oder Excel Datei von Ihrer Bank</span>
                  </div>
                )}
              </div>

              {/* Optional PDF */}
              <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 flex items-center gap-4">
                <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded-lg text-red-500">
                    <FileIcon size={20} />
                </div>
                <div className="flex-grow">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Belegbild (PDF)</h4>
                    <p className="text-xs text-slate-500">Optional: Kontoauszug als PDF</p>
                </div>
                <div>
                    <input
                        type="file"
                        id="pdf-upload"
                        className="hidden"
                        accept=".pdf"
                        onChange={(e) => e.target.files && updateData({ pdfFile: e.target.files[0] })}
                    />
                    <button
                        onClick={handlePdfUploadClick}
                        className={`text-xs font-bold px-3 py-2 rounded-lg transition-colors border ${data.pdfFile ? 'bg-green-100 border-green-200 text-green-700' : 'bg-transparent border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-50'}`}
                    >
                        {data.pdfFile ? 'PDF Ersetzten' : 'Hochladen'}
                    </button>
                </div>
              </div>
          </div>

          {/* Right Column: Provider Selection (Conditional) */}
          <div className={`transition-all duration-500 ${data.dataFile ? 'opacity-100 translate-x-0' : 'opacity-40 translate-x-4 pointer-events-none blur-[1px]'}`}>
              <div className="flex justify-between items-center mb-4">
                 <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <CreditCard size={18} className="text-primary-500" />
                    Quelle wählen
                 </h3>
                 <div className="relative w-40">
                    <Search size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Suchen..."
                        className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-slate-100 dark:bg-slate-800 border-none focus:ring-1 focus:ring-primary-500"
                    />
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-3 max-h-[320px] overflow-y-auto pr-1 custom-scrollbar">
                {filteredProviders.map((p) => (
                    <button
                        key={p.name}
                        onClick={() => updateData({ provider: p.name })}
                        className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left group ${
                            data.provider === p.name
                            ? 'bg-primary-50 dark:bg-primary-900/20 border-primary-500 ring-1 ring-primary-500'
                            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-primary-400'
                        }`}
                    >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs transition-colors ${
                             data.provider === p.name ? 'bg-primary-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/50 group-hover:text-primary-600'
                        }`}>
                            {p.logo}
                        </div>
                        <div>
                            <div className="font-bold text-slate-900 dark:text-white text-sm leading-tight">{p.name}</div>
                            <div className="text-[10px] text-slate-500">{p.type}</div>
                        </div>
                        {data.provider === p.name && <CheckCircle2 size={16} className="ml-auto text-primary-500" />}
                    </button>
                ))}
              </div>
          </div>
      </div>
    </div>
  );
};

export default SmartUploadStep;
