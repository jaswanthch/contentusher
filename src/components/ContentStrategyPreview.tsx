import React, { useState } from 'react';
import { Download, ChevronDown, ChevronUp } from 'lucide-react';
import { ContentStrategy, ContentBrief } from '../types';
import { generateStrategyPDF } from '../utils/strategyPdfGenerator';

interface Props {
  strategy: ContentStrategy;
  businessInfo: {
    businessName: string;
    industry: string;
    platform: string;
  };
}

function ContentBriefCard({ brief }: { brief: ContentBrief }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
      >
        <h4 className="font-medium text-gray-900">{brief.topic}</h4>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>
      
      {isExpanded && (
        <div className="p-4 border-t border-gray-200 space-y-4">
          <div>
            <h5 className="font-medium text-gray-700 mb-2">Target Keywords</h5>
            <div className="flex flex-wrap gap-2">
              {brief.targetKeywords.map((keyword, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h5 className="font-medium text-gray-700 mb-2">Content Outline</h5>
            <ol className="list-decimal list-inside space-y-1 text-gray-600">
              {brief.outline.map((section, index) => (
                <li key={index}>{section}</li>
              ))}
            </ol>
          </div>

          <div>
            <h5 className="font-medium text-gray-700 mb-2">Key Points</h5>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              {brief.keyPoints.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="font-medium text-gray-700 mb-2">Target Audience</h5>
            <p className="text-gray-600">{brief.targetAudience}</p>
          </div>

          <div>
            <h5 className="font-medium text-gray-700 mb-2">Tone</h5>
            <p className="text-gray-600">{brief.tone}</p>
          </div>

          <div>
            <h5 className="font-medium text-gray-700 mb-2">Call to Action</h5>
            <p className="text-gray-600">{brief.callToAction}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ContentStrategyPreview({ strategy, businessInfo }: Props) {
  const handleDownloadPDF = () => {
    const doc = generateStrategyPDF(strategy, businessInfo);
    doc.save(`${businessInfo.businessName}-${businessInfo.platform}-strategy.pdf`);
  };

  const sectionClasses = "space-y-4 pb-6 mb-6 border-b border-gray-200 last:border-0 last:mb-0 last:pb-0";
  const titleClasses = "text-xl font-semibold text-gray-900 mb-4";
  const subtitleClasses = "font-medium text-gray-700 mb-2";
  const listClasses = "list-disc list-inside space-y-1 text-gray-600";

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Content Strategy</h2>
        <button
          onClick={handleDownloadPDF}
          className="flex items-center gap-2 px-4 py-2 text-[var(--primary)] hover:text-[var(--primary-hover)] transition-colors"
        >
          <Download className="w-5 h-5" />
          <span>Download PDF</span>
        </button>
      </div>

      <div className={sectionClasses}>
        <h3 className={titleClasses}>Overview</h3>
        <p className="text-gray-600">{strategy.overview}</p>
      </div>

      <div className={sectionClasses}>
        <h3 className={titleClasses}>Target Audience</h3>
        <div className="space-y-4">
          <div>
            <h4 className={subtitleClasses}>Demographics</h4>
            <p className="text-gray-600">{strategy.targetAudience.demographics}</p>
          </div>
          <div>
            <h4 className={subtitleClasses}>Interests</h4>
            <ul className={listClasses}>
              {strategy.targetAudience.interests.map((interest, index) => (
                <li key={index}>{interest}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className={subtitleClasses}>Pain Points</h4>
            <ul className={listClasses}>
              {strategy.targetAudience.painPoints.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className={sectionClasses}>
        <h3 className={titleClasses}>Content Plan</h3>
        <div className="space-y-4">
          <div>
            <h4 className={subtitleClasses}>Content Types</h4>
            <ul className={listClasses}>
              {strategy.contentPlan.types.map((type, index) => (
                <li key={index}>{type}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className={subtitleClasses}>Topics</h4>
            <ul className={listClasses}>
              {strategy.contentPlan.topics.map((topic, index) => (
                <li key={index}>{topic}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className={subtitleClasses}>Best Practices</h4>
            <ul className={listClasses}>
              {strategy.contentPlan.bestPractices.map((practice, index) => (
                <li key={index}>{practice}</li>
              ))}
            </ul>
          </div>
          
          {strategy.contentPlan.contentBriefs && (
            <div>
              <h4 className={subtitleClasses}>Content Briefs</h4>
              <div className="space-y-2">
                {strategy.contentPlan.contentBriefs.map((brief, index) => (
                  <ContentBriefCard key={index} brief={brief} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={sectionClasses}>
        <h3 className={titleClasses}>Posting Schedule</h3>
        <div className="space-y-4">
          <div>
            <h4 className={subtitleClasses}>Frequency</h4>
            <p className="text-gray-600">{strategy.postingSchedule.frequency}</p>
          </div>
          <div>
            <h4 className={subtitleClasses}>Best Times to Post</h4>
            <ul className={listClasses}>
              {strategy.postingSchedule.bestTimes.map((time, index) => (
                <li key={index}>{time}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className={subtitleClasses}>Consistency Guidelines</h4>
            <p className="text-gray-600">{strategy.postingSchedule.consistency}</p>
          </div>
        </div>
      </div>

      <div className={sectionClasses}>
        <h3 className={titleClasses}>Engagement Strategy</h3>
        <div className="space-y-4">
          <div>
            <h4 className={subtitleClasses}>Tactics</h4>
            <ul className={listClasses}>
              {strategy.engagement.tactics.map((tactic, index) => (
                <li key={index}>{tactic}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className={subtitleClasses}>Response Guidelines</h4>
            <ul className={listClasses}>
              {strategy.engagement.responses.map((response, index) => (
                <li key={index}>{response}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className={subtitleClasses}>Monitoring</h4>
            <ul className={listClasses}>
              {strategy.engagement.monitoring.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className={sectionClasses}>
        <h3 className={titleClasses}>Metrics & KPIs</h3>
        <div className="space-y-4">
          <div>
            <h4 className={subtitleClasses}>Key Performance Indicators</h4>
            <ul className={listClasses}>
              {strategy.metrics.kpis.map((kpi, index) => (
                <li key={index}>{kpi}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className={subtitleClasses}>Measurement Tools</h4>
            <ul className={listClasses}>
              {strategy.metrics.tools.map((tool, index) => (
                <li key={index}>{tool}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className={subtitleClasses}>Goals</h4>
            <ul className={listClasses}>
              {strategy.metrics.goals.map((goal, index) => (
                <li key={index}>{goal}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}