import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, Terminal } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorId: string;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorId: '',
  };

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { 
        hasError: true, 
        error,
        errorId: Math.random().toString(36).substr(2, 6).toUpperCase()
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Biryani360 Critical Error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  handleHome = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/?screen=LANDING';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-charcoal-950 flex flex-col items-center justify-center p-6 text-center animate-fade-in font-sans text-cream-50 relative overflow-hidden">
           
           {/* Background FX */}
           <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
           <div className="absolute top-0 right-0 w-64 h-64 bg-red-900/20 rounded-full blur-3xl -mr-20 -mt-20"></div>

           <div className="bg-charcoal-900/80 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl max-w-md w-full relative z-10">
               <div className="w-20 h-20 bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/30 shadow-[0_0_30px_rgba(220,38,38,0.2)]">
                   <AlertTriangle className="w-10 h-10 text-red-500" />
               </div>

               <h2 className="text-2xl font-serif font-bold text-white mb-2">System Failure</h2>
               <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                   The kitchen encountered an unexpected issue. Our chefs are looking into the spilled spices.
               </p>

               <div className="bg-black/40 rounded-lg p-3 mb-8 font-mono text-[10px] text-red-300 text-left border border-red-900/30 flex items-start gap-3">
                   <Terminal className="w-4 h-4 shrink-0 mt-0.5 opacity-50" />
                   <div>
                       <p>ERR_CODE: {this.state.errorId}</p>
                       <p className="opacity-70 mt-1 line-clamp-2">{this.state.error?.message || 'Unknown Error'}</p>
                   </div>
               </div>

               <div className="flex gap-3">
                   <button 
                       onClick={this.handleRetry}
                       className="flex-1 bg-white text-charcoal-950 py-3 rounded-xl font-bold text-sm hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                   >
                       <RefreshCw className="w-4 h-4" /> Retry
                   </button>
                   <button 
                       onClick={this.handleHome}
                       className="flex-1 bg-charcoal-800 text-white py-3 rounded-xl font-bold text-sm border border-white/10 hover:bg-charcoal-700 transition-colors flex items-center justify-center gap-2"
                   >
                       <Home className="w-4 h-4" /> Home
                   </button>
               </div>
           </div>
        </div>
      );
    }

    return this.props.children;
  }
}