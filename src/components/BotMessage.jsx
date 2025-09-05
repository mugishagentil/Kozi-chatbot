import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Bot } from 'lucide-react';

const BotMessage = ({ message }) => {
  return (
    <div className="flex items-start space-x-2">
      <div className="flex-shrink-0 pt-1">
        <Bot size={24} className="text-purple-500" />
      </div>
      <div className="flex-grow max-w-3xl bg-gray-900 rounded-lg shadow-lg border border-gray-700 p-4 markdown-body">
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({node, ...props}) => <h1 className="text-2xl font-bold text-gray-100 mb-4" {...props} />,
            h2: ({node, ...props}) => <h2 className="text-xl font-bold text-gray-100 mb-3" {...props} />,
            h3: ({node, ...props}) => <h3 className="text-lg font-bold text-gray-100 mb-2" {...props} />,
            p: ({node, ...props}) => <p className="text-gray-100 mb-4" {...props} />,
            ul: ({node, ...props}) => <ul className="list-disc list-inside text-gray-100 mb-4 space-y-2" {...props} />,
            ol: ({node, ...props}) => <ol className="list-decimal list-inside text-gray-100 mb-4 space-y-2" {...props} />,
            li: ({node, ...props}) => <li className="text-gray-100" {...props} />,
            strong: ({node, ...props}) => <strong className="font-bold text-purple-400" {...props} />,
            em: ({node, ...props}) => <em className="text-purple-300 italic" {...props} />,
            code: ({node, inline, ...props}) => 
              inline ? (
                <code className="bg-gray-800 text-purple-300 px-1 rounded" {...props} />
              ) : (
                <code className="block bg-gray-800 text-purple-300 p-3 rounded-md my-2 whitespace-pre-wrap" {...props} />
              ),
            blockquote: ({node, ...props}) => (
              <blockquote className="border-l-4 border-purple-500 pl-4 my-4 text-gray-300 italic" {...props} />
            ),
            a: ({node, ...props}) => (
              <a className="text-purple-400 hover:text-purple-300 underline" {...props} />
            ),
            hr: ({node, ...props}) => <hr className="border-gray-700 my-4" {...props} />,
          }}
        >
          {message}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default BotMessage;
