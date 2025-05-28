'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
}

const FAQ = ({ items }: FAQProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mx-auto w-full">
      <div>
        {items.map((item, index) => (
          <div
            key={index}
            className={cn(
              'overflow-hidden rounded-xl border border-dashed border-transparent px-4',
              openIndex === index && 'border-blue-500 bg-blue-50/50'
            )}
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="flex w-full cursor-pointer items-start gap-2 py-3"
            >
              <motion.div
                animate={{ rotate: openIndex === index ? 45 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <PlusIcon className="h-5 w-5 text-blue-500" />
              </motion.div>
              <span className="text-left text-sm font-semibold">{item.question}</span>
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pb-3">
                    <p className="text-xs text-neutral-900">{item.answer}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
