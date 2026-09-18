"use client";

import { FormEvent, useEffect, useState } from "react";
import { motion } from "motion/react";
import { toast } from "sonner";
import Hero3D from "./Hero3D";
import SkillIcon, { ChannelIcon } from "./Icons";
import { apiBase, type PortfolioPayload } from "@/lib/api";

export default function HomeClient({ data }: { data: PortfolioPayload }) {
  const { profile, tech_chips, skill_categories, projects, timeline, channels } = data;
  const resumeHref = profile.resume_url || "/Kobit_Gurung_CV.pdf";
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [btnLabel, setBtnLabel] = useState("Send message");


  useEffect(() => {
    document.querySelectorAll(".btn-l").forEach((btn) => {
      (btn as HTMLElement).addEventListener("mousemove", (e) => {
        const ev = e as MouseEvent;
        const r = (btn as HTMLElement).getBoundingClientRect();
        (btn as HTMLElement).style.setProperty("--mx", ((ev.clientX - r.left) / r.width) * 100 + "%");
        (btn as HTMLElement).style.setProperty("--my", ((ev.clientY - r.top) / r.height) * 100 + "%");
      });
    });

    const bar = document.querySelector(".scroll-progress-l") as HTMLElement | null;
    const navBar = document.getElementById("navBar");
    let ticking = false;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      if (bar) bar.style.width = pct + "%";
      if (navBar) navBar.classList.toggle("scrolled", window.scrollY > 60);
      ticking = false;
    };
    const onScrollBar = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScrollBar, { passive: true });
    update();

    const items = document.querySelectorAll(".reveal-l, .reveal-l-stagger");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -50px 0px" },
    );
    items.forEach((el) => io.observe(el));

    const words = document.querySelectorAll(".hero__title .word");
    words.forEach((w, i) => {
      const el = w as HTMLElement;
      el.style.transform = "translateY(110%)";
      el.style.transition = `transform 0.9s cubic-bezier(.16,1,.3,1) ${0.25 + i * 0.1}s`;
    });
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        words.forEach((w) => {
          (w as HTMLElement).style.transform = "none";
        });
      }),
    );

    const tag = document.querySelector(".hero__tagline") as HTMLElement | null;
    if (tag) {
      tag.style.opacity = "0";
      tag.style.transform = "translateY(12px)";
      tag.style.transition = "opacity 0.8s ease, transform 0.8s cubic-bezier(.16,1,.3,1)";
      setTimeout(() => {
        tag.style.opacity = "1";
        tag.style.transform = "none";
      }, 800);
    }

    document.querySelectorAll(".hero__cta .btn-l").forEach((btn, i) => {
      const el = btn as HTMLElement;
      el.style.opacity = "0";
      el.style.transform = "translateY(16px)";
      el.style.transition = `opacity 0.7s ease ${0.9 + i * 0.12}s, transform 0.7s cubic-bezier(.16,1,.3,1) ${0.9 + i * 0.12}s`;
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          el.style.opacity = "1";
          el.style.transform = "none";
        }),
      );
    });

    const strip = document.querySelector(".projects-l__strip") as HTMLElement | null;
    const prev = document.querySelector('[data-proj="prev"]');
    const next = document.querySelector('[data-proj="next"]');
    const step = (dir: number) => {
      if (!strip) return;
      const card = strip.querySelector(".project-l");
      if (!card) return;
      const w = card.getBoundingClientRect().width + 22;
      strip.scrollBy({ left: dir * w, behavior: "smooth" });
    };
    const onPrev = () => step(-1);
    const onNext = () => step(1);
    prev?.addEventListener("click", onPrev);
    next?.addEventListener("click", onNext);
    let isDown = false,
      startX = 0,
      scrollL = 0;
    const onDownStrip = (e: MouseEvent) => {
      if (!strip) return;
      isDown = true;
      strip.style.cursor = "grabbing";
      startX = e.pageX - strip.offsetLeft;
      scrollL = strip.scrollLeft;
    };
    const onLeave = () => {
      isDown = false;
      if (strip) strip.style.cursor = "";
    };
    const onUpStrip = () => {
      isDown = false;
      if (strip) strip.style.cursor = "";
    };
    const onMoveStrip = (e: MouseEvent) => {
      if (!isDown || !strip) return;
      e.preventDefault();
      const x = e.pageX - strip.offsetLeft;
      strip.scrollLeft = scrollL - (x - startX) * 1.2;
    };
    strip?.addEventListener("mousedown", onDownStrip);
    strip?.addEventListener("mouseleave", onLeave);
    strip?.addEventListener("mouseup", onUpStrip);
    strip?.addEventListener("mousemove", onMoveStrip);

    if (!matchMedia("(pointer: coarse)").matches) {
      document.querySelectorAll(".project-l[data-preview]").forEach((card) => {
        const media = card.querySelector(".project-l__media");
        const src = card.getAttribute("data-preview");
        if (!media || !src) return;
        let mounted = false;
        card.addEventListener("mouseenter", () => {
          if (mounted) return;
          mounted = true;
          const layer = document.createElement("div");
          layer.className = "project-l__preview is-loading";
          const img = document.createElement("img");
          img.alt = "Preview of " + (card.querySelector(".project-l__title")?.textContent || "");
          img.loading = "lazy";
          img.decoding = "async";
          img.addEventListener("load", () => layer.classList.remove("is-loading"));
          img.addEventListener("error", () => layer.remove());
          const tagEl = document.createElement("span");
          tagEl.className = "project-l__preview-tag";
          tagEl.textContent = "Preview";
          layer.appendChild(img);
          layer.appendChild(tagEl);
          media.appendChild(layer);
          img.src = src;
        });
      });
    }

    const sections = document.querySelectorAll(".section-l[id]");
    const navLinks = document.querySelectorAll(".nav-r a, .mobile-nav a");
    const navIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            const id = (en.target as HTMLElement).id;
            navLinks.forEach((l) => {
              l.classList.toggle("active", l.getAttribute("href") === "#" + id);
            });
          }
        });
      },
      { threshold: 0.2, rootMargin: "-80px 0px -40% 0px" },
    );
    sections.forEach((s) => navIo.observe(s));

    const scrollEl = document.querySelector(".hero__scroll") as HTMLElement | null;
    let hidden = false;
    const hideScroll = () => {
      if (!hidden && window.scrollY > 80 && scrollEl) {
        scrollEl.style.opacity = "0";
        scrollEl.style.transition = "opacity 0.5s";
        hidden = true;
      }
    };
    window.addEventListener("scroll", hideScroll, { passive: true });

    const wm = document.querySelector(".hero__watermark") as HTMLElement | null;
    const wm2 = document.querySelector(".hero__watermark--sub") as HTMLElement | null;
    let wmTick = false;
    const moveWm = () => {
      if (!wm) return;
      const y = window.scrollY;
      const factor = Math.min(y / 800, 1);
      wm.style.transform = `translate(-50%, calc(-50% + ${y * 0.12}px))`;
      wm.style.opacity = String(0.05 * (1 - factor * 0.6));
      if (wm2) {
        wm2.style.transform = `translate(-50%, calc(-50% + 0.85em + ${y * 0.06}px))`;
        wm2.style.opacity = String(0.04 * (1 - factor * 0.6));
      }
      wmTick = false;
    };
    const onWmScroll = () => {
      if (!wmTick) {
        requestAnimationFrame(moveWm);
        wmTick = true;
      }
    };
    window.addEventListener("scroll", onWmScroll, { passive: true });

    const logo = document.querySelector(".nav-l");
    const onLogo = (e: Event) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    logo?.addEventListener("click", onLogo);

    return () => {
      window.removeEventListener("scroll", onScrollBar);
      window.removeEventListener("scroll", hideScroll);
      window.removeEventListener("scroll", onWmScroll);
      io.disconnect();
      navIo.disconnect();
      prev?.removeEventListener("click", onPrev);
      next?.removeEventListener("click", onNext);
      strip?.removeEventListener("mousedown", onDownStrip);
      strip?.removeEventListener("mouseleave", onLeave);
      strip?.removeEventListener("mouseup", onUpStrip);
      strip?.removeEventListener("mousemove", onMoveStrip);
      logo?.removeEventListener("click", onLogo);
    };
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const original = "Send message";
    setSending(true);
    setBtnLabel("Sending...");
    const fd = new FormData(form);
    try {
      const res = await fetch(`${apiBase()}/api/contact/`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          subject: fd.get("subject") || "",
          message: fd.get("message"),
        }),
      });
      const json = await res.json();
      if (json.success) {
        setSent(true);
        setBtnLabel("Message sent ✓");
        form.reset();
        toast.success("Message sent!", {
          description: "Thanks for reaching out — I'll get back to you soon.",
        });
        setTimeout(() => {
          setSent(false);
          setBtnLabel(original);
          setSending(false);
        }, 3000);
      } else {
        throw new Error("fail");
      }
    } catch {
      setBtnLabel(original);
      setSending(false);
      toast.error("Failed to send.", {
        description: "Something went wrong. Please email me directly.",
      });
    }
  }

  function projectClass(variant: string) {
    if (variant === "featured") return "project-l project-l--featured";
    if (variant === "dev") return "project-l project-l--dev";
    return "project-l";
  }

  function projectHref(url: string) {
    if (url === "#contact") return "#contact";
    return url || "#";
  }

  function channelHref(ch: (typeof channels)[number]) {
    if (ch.kind === "resume") return resumeHref;
    return ch.href;
  }

  return (
    <>
      <div className="scroll-progress-l" />
      <div className="paper" aria-hidden="true" />

      <header className="nav-bar" id="navBar">
        <a href="#top" className="nav-l" aria-label="Back to top">
          <span className="nav-l__dot" />
          {profile.nav_name}
        </a>
        <div className="status">
          <span className="status__dot" />
          {profile.status_line}
        </div>
        <nav className="nav-r" aria-label="Primary">
          <a href="#about">About</a>
          <a href="#work">Work</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero" data-screen-label="01 Hero">
          <span className="hero__watermark">{profile.watermark}</span>
          <span className="hero__watermark--sub">{profile.watermark_sub}</span>
          <Hero3D robotUrl={profile.robot_url} />
          <div className="hero__overlay">
            <div className="hero__tagline">{profile.tagline}</div>
            <h1 className="hero__title">
              {profile.hero_title_rows.map((row, i) => (
                <span className="row" key={i}>
                  {row.map((word, j) => (
                    <span key={j}>
                      {j > 0 ? " " : null}
                      <span className="word">{word}</span>
                    </span>
                  ))}
                </span>
              ))}
            </h1>
            <div className="hero__cta">
              <a className="btn-l btn-l--primary" href="#work">
                View My Work <span className="btn-l__arrow">&rarr;</span>
              </a>
              <a className="btn-l btn-l--ghost" href={resumeHref} target="_blank" rel="noopener">
                View Resume <span className="btn-l__arrow">&rarr;</span>
              </a>
            </div>
          </div>
          <div className="hero__scroll" aria-hidden="true">
            <div className="hero__scroll-line" />
          </div>
          <div className="hero__strip">
            <div className="hero__strip-l">
              <p>{profile.currently_building_label}</p>
              <p>{profile.currently_building}</p>
            </div>
            <a className="hero__strip-r" href="#contact">
              <span className="hero__strip-r__dot" />
              {profile.open_to}
            </a>
          </div>
        </section>

        <motion.section
          className="section-l"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: "easeOut" }} id="about" data-screen-label="02 About">
          <div className="about-l">
            <div className="reveal-l">
              <span className="eyebrow-l">{profile.about_eyebrow}</span>
              <h2 className="section-title-l" dangerouslySetInnerHTML={{ __html: profile.about_title_html }} />
            </div>
            <div className="about-l__body reveal-l">
              {profile.about_paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <div className="about-l__stats reveal-l-stagger">
                {profile.stats.map((s) => (
                  <div className="stat-l" key={s.label}>
                    <div className="stat-l__num">{s.num}</div>
                    <div className="stat-l__label">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="tech-cloud" style={{ marginTop: 32 }}>
                {tech_chips.map((c) => (
                  <span className="tech-chip" key={c}>
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          className="section-l"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: "easeOut" }} id="skills" data-screen-label="03 Skills">
          <div className="reveal-l">
            <span className="eyebrow-l">{profile.skills_eyebrow}</span>
            <h2 className="section-title-l" dangerouslySetInnerHTML={{ __html: profile.skills_title_html }} />
            <p className="section-sub-l">{profile.skills_sub}</p>
          </div>
          <div className="skills-l__grid reveal-l-stagger">
            {skill_categories.map((cat) => (
              <article className="card-l skill-l" key={cat.name}>
                <div className="skill-l__num">{cat.number}</div>
                <div className="skill-l__icon" aria-hidden="true">
                  <SkillIcon icon={cat.icon} />
                </div>
                <h3 className="skill-l__name">{cat.name}</h3>
                <ul className="skill-l__list">
                  {cat.skills.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="section-l"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: "easeOut" }} id="work" data-screen-label="04 Work">
          <div className="projects-l__head reveal-l">
            <div>
              <span className="eyebrow-l">{profile.work_eyebrow}</span>
              <h2 className="section-title-l" dangerouslySetInnerHTML={{ __html: profile.work_title_html }} />
              <p className="section-sub-l">{profile.work_sub}</p>
            </div>
            <div className="projects-l__nav">
              <button className="proj-nav-btn" data-proj="prev" aria-label="Previous" type="button" dangerouslySetInnerHTML={{ __html: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 13L5 8l5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>' }} />
              <button className="proj-nav-btn" data-proj="next" aria-label="Next" type="button" dangerouslySetInnerHTML={{ __html: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>' }} />
            </div>
          </div>
          <div className="projects-l__strip">
            {projects.map((p) => {
              const href = projectHref(p.url);
              const external = href.startsWith("http");
              return (
                <a
                  key={p.id}
                  className={projectClass(p.variant)}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener" : undefined}
                  data-preview={p.preview_url || undefined}
                  data-hover={p.hover ? true : undefined}
                >
                  <div className="project-l__media">
                    <div className="project-l__media-grid" />
                    {p.badge ? (
                      <div className={p.badge_variant === "art" ? "project-l__badge project-l__badge--art" : "project-l__badge"}>
                        {p.badge}
                      </div>
                    ) : null}
                    <div className="project-l__media-content">
                      <div className="project-l__bar">
                        <span className="project-l__bar-dot" />
                        <span className="project-l__bar-dot" />
                        <span className="project-l__bar-dot" />
                        <span className="project-l__bar-url">{p.bar_url}</span>
                      </div>
                      {p.lines.map((line, i) =>
                        line === "block" ? (
                          <div className="project-l__block" key={i} />
                        ) : (
                          <div className={`project-l__line ${line}`} key={i} />
                        ),
                      )}
                    </div>
                  </div>
                  <div className="project-l__body">
                    <div className="project-l__tags">
                      {p.tags.map((t) => (
                        <span className="project-l__tag" key={t}>
                          {t}
                        </span>
                      ))}
                    </div>
                    <h3 className="project-l__title">{p.title}</h3>
                    <p className="project-l__desc">{p.description}</p>
                    <div className="project-l__meta">
                      <span>{p.meta}</span>
                      <span className="project-l__link">{p.link_label}</span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </motion.section>

        <motion.section
          className="section-l"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: "easeOut" }} id="journey" data-screen-label="05 Journey">
          <div className="reveal-l">
            <span className="eyebrow-l">{profile.journey_eyebrow}</span>
            <h2 className="section-title-l" dangerouslySetInnerHTML={{ __html: profile.journey_title_html }} />
            <p className="section-sub-l">{profile.journey_sub}</p>
          </div>
          <div className="timeline-l reveal-l-stagger">
            {timeline.map((item) => (
              <div className="tl-l-item" key={item.title}>
                <span className="tl-l-item__dot" />
                <div className="tl-l-item__meta">{item.meta}</div>
                <h3 className="tl-l-item__title">{item.title}</h3>
                <div className="tl-l-item__sub">{item.subtitle}</div>
                <p className="tl-l-item__body">{item.body}</p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="section-l"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: "easeOut" }} id="contact" data-screen-label="06 Contact">
          <div className="reveal-l">
            <span className="eyebrow-l">{profile.contact_eyebrow}</span>
            <h2 className="section-title-l" dangerouslySetInnerHTML={{ __html: profile.contact_title_html }} />
            <p className="section-sub-l">{profile.contact_sub}</p>
          </div>
          <div className="contact-l">
            <div className="reveal-l-stagger">
              {channels.map((ch) => {
                const href = channelHref(ch);
                const external = href.startsWith("http");
                return (
                  <a
                    className="channel-l"
                    key={ch.kind}
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener" : undefined}
                  >
                    <span className="channel-l__icon">
                      <ChannelIcon kind={ch.kind} />
                    </span>
                    <div>
                      <div className="channel-l__label">{ch.label}</div>
                      <div className="channel-l__value">{ch.value}</div>
                    </div>
                  </a>
                );
              })}
            </div>
            <form className="card-l form-l reveal-l" id="contact-form" onSubmit={onSubmit}>
              <div className="form-l__row">
                <div className="field-l">
                  <label htmlFor="ln-name">Your name</label>
                  <input id="ln-name" name="name" type="text" placeholder="Kobit" required />
                </div>
                <div className="field-l">
                  <label htmlFor="ln-email">Email</label>
                  <input id="ln-email" name="email" type="email" placeholder="kobitgrg22@gmail.com" required />
                </div>
              </div>
              <div className="field-l">
                <label htmlFor="ln-subject">Subject</label>
                <input id="ln-subject" name="subject" type="text" placeholder="Internship · collab · just saying hi" />
              </div>
              <div className="field-l">
                <label htmlFor="ln-msg">Message</label>
                <textarea id="ln-msg" name="message" placeholder="Tell me about the idea, the timeline, the constraints..." required />
              </div>
              <button className={`form-l__submit${sent ? " is-sent" : ""}`} type="submit" disabled={sending}>
                {btnLabel} {sent || sending ? null : <span aria-hidden="true">&rarr;</span>}
              </button>
            </form>
          </div>
        </motion.section>
      </main>

      <footer className="footer-l" data-screen-label="07 Footer">
        <div className="footer-l__inner">
          <div>
            <h2 className="footer-l__mark">
              Kobit
              <br />
              Gurung.
            </h2>
            <p className="footer-l__tagline">{profile.footer_tagline}</p>
          </div>
          <div className="footer-l__col">
            <h4>Sitemap</h4>
            <ul>
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#skills">Skills</a>
              </li>
              <li>
                <a href="#work">Work</a>
              </li>
              <li>
                <a href="#journey">Journey</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>
          <div className="footer-l__col">
            <h4>Elsewhere</h4>
            <ul>
              <li>
                <a href={profile.github_url} target="_blank" rel="noopener">
                  GitHub
                </a>
              </li>
              <li>
                <a href={profile.linkedin_url} target="_blank" rel="noopener">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={`mailto:${profile.email}`}>Email</a>
              </li>
              <li>
                <a href={resumeHref} target="_blank" rel="noopener">
                  Download CV
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-l__bottom">
          <span>&copy; 2026 Kobit Gurung. All rights reserved.</span>
          <span>Crafted with care</span>
        </div>
      </footer>

      <a className="chat" href="#contact">
        <span className="chat__dot" />
        Let&apos;s chat
      </a>

      <div className="mobile-nav" aria-label="Mobile navigation">
        <div className="mobile-nav__inner">
          <a href="#about">About</a>
          <a href="#work">Work</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
    </>
  );
}
