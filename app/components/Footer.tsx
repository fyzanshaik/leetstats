import Link from "next/link";
import { Github, Twitter, Heart, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background py-4 text-muted-foreground text-center text-sm"> 
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8"> 
        <p className="text-sm font-medium flex items-center justify-center gap-1.5 mb-3"> 
          Created with <Heart className="w-3.5 h-3.5 text-red-500 fill-current" /> by{" "} 
          <span className="text-primary font-semibold">@fyzanshaik</span>
        </p>

        <div className="flex items-center justify-center gap-5"> 
          <Link
            href="https://github.com/fyzanshaik"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors text-xs" 
            aria-label="View Fyzan Shaik's GitHub profile"
          >
            <Github className="w-3.5 h-3.5" /> 
            GitHub
            <ExternalLink className="w-2.5 h-2.5 ml-0.5" /> 
          </Link>
          <Link
            href="https://twitter.com/fyzanshaik" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors text-xs"
            aria-label="Follow Fyzan Shaik on Twitter/X"
          >
            <Twitter className="w-3.5 h-3.5" /> 
            Twitter
            <ExternalLink className="w-2.5 h-2.5 ml-0.5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}   