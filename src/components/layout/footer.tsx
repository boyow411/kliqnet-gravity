import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { site } from "@/lib/site";
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <Logo />
            <p>
              We build the digital side of your business.
              <br />
              London, UK · An independent agency & product studio.
            </p>
            <a className="text-link" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </div>
          <div>
            <p className="eyebrow">Explore</p>
            <Link href="/projects">Our work & products</Link>
            <Link href="/services">Services</Link>
            <Link href="/about">About Kliqnet</Link>
            <Link href="/blog">Insights</Link>
            <Link href="/contact">Start a project</Link>
          </div>
          <div>
            <p className="eyebrow">Let’s make progress</p>
            <p>
              A brief is a starting point.
              <br />
              We’ll help shape what comes next.
            </p>
            <Link className="text-link" href="/book-a-call">
              Request a strategy call ↗
            </Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Kliqnet Digital</span>
          <div>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/brand">Brand assets</Link>
          </div>
          <span>Built with purpose. By Kliqnet.</span>
        </div>
      </div>
    </footer>
  );
}
