"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeUp from "@/components/FadeUp";
import { useSupabaseImages, useSupabaseSlotImages } from "@/lib/useSupabaseImages";

export default function AboutPage() {
  const { images: aboutImages } = useSupabaseImages("about");
  const { images: founderImages } = useSupabaseSlotImages("about-founders", 2);
  const { images: environmentImages } = useSupabaseSlotImages("about-environment", 6);
  const fallbackHeroImages = [
    "/about%20page/first%20section%20pic.jpg",
    "/about%20page/second%20section.JPG",
  ];
  const heroImages = [
    aboutImages[0] || fallbackHeroImages[0],
    aboutImages[1] || fallbackHeroImages[1],
  ];
  const nikitaFounderImage = "/about%20page/founders/WhatsApp%20Image%202026-04-19%20at%2000.05.49.jpeg";
  const fallbackEnvironmentImages = [
    "/about%20page/images/creative%20.jpg",           // Creative Arts Corner
    "/about%20page/images/play.jpg",                   // Play & Discovery
    null,                                               // Montessori Materials - placeholder
    "/about%20page/images/learning%20togethere.jpg",  // Learning Together
    "/about%20page/images/outdoor%20adventures.jpg",  // Outdoor Adventures
  ];
  const images = [
    heroImages[0],
    heroImages[1],
    nikitaFounderImage,
    founderImages[1],
    environmentImages[0] || fallbackEnvironmentImages[0],
    environmentImages[1] || fallbackEnvironmentImages[1],
    environmentImages[2],
    environmentImages[3] || fallbackEnvironmentImages[3],
    environmentImages[4] || fallbackEnvironmentImages[4],
    environmentImages[5],
  ];

  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="bg-white min-h-screen flex items-center pt-28 md:pt-32 pb-12 md:pb-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center w-full">
          <FadeUp>
            <h1 className="text-4xl md:text-6xl font-extrabold text-[#5EA85B] leading-tight mb-6">
              Explore the concept of micro preschool, with Ukti Early
            </h1>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-md">
              Montessori-based preschool where children learn at their own pace.
            </p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="relative w-full aspect-[5/4]">
              <div className="relative w-full h-full bg-gray-300 rounded-3xl overflow-hidden">
                {images[0] ? (
                  <Image
                    src={images[0]}
                    alt="Children learning at Ukti Early Years"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                ) : (
                  <span className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm">
                    Image Placeholder
                  </span>
                )}
              </div>

              {/* Top-right sparkle badge */}
              <motion.div
                className="absolute -top-5 -right-5 w-16 h-16 rounded-full bg-[#F2DA36] flex items-center justify-center shadow-lg"
                animate={{ y: [0, -24, 0], x: [0, 16, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg className="w-7 h-7 text-[#5EA85B]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l1.6 5.4L19 9l-5.4 1.6L12 16l-1.6-5.4L5 9l5.4-1.6z" />
                  <path d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8z" />
                </svg>
              </motion.div>

              {/* Bottom-left heart badge */}
              <motion.div
                className="absolute -bottom-5 -left-5 w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg"
                animate={{ y: [0, 20, 0], x: [0, -16, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <svg className="w-7 h-7 text-[#5EA85B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </motion.div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-white py-12 md:py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
          <FadeUp>
            <div className="relative w-full aspect-[5/4] bg-gray-300 rounded-3xl overflow-hidden">
              {images[1] ? (
                <Image
                  src={images[1]}
                  alt="Our Story at Ukti"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <span className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm">
                  Image Placeholder
                </span>
              )}
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#F6892A] mb-6 md:mb-8">
              Our Story
            </h2>
            <div className="space-y-5">
              {[
                {
                  heading: "The Problem",
                  body: "Preschools had become overly structured, rushed, and often focused on outcomes rather than the child. There was little room for curiosity, creativity, or emotional connection.",
                },
                {
                  heading: "The Idea",
                  body: "We imagined something different—a space where children could truly feel at ease. A space where children could learn, express, and grow without inhibition. Not just a school, but a home for learning—intimate, nurturing, and deeply child-centric.",
                },
                {
                  heading: "The Beginning",
                  body: "With this vision, Ukti Early Years was born in 2021. What started as a shared belief between two educators soon became a thoughtfully designed micro preschool. Every corner of Ukti was built with intention—to create meaningful experiences, foster emotional wellbeing, and nurture a lifelong love for learning.",
                },
              ].map((item) => (
                <div key={item.heading} className="flex gap-3">
                  <span className="mt-1.5 w-2.5 h-2.5 rounded-full bg-[#F6892A] flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{item.heading}</h3>
                    <p className="text-gray-700 leading-relaxed">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-[#F4EFE6] py-12 md:py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <h2 className="text-3xl md:text-5xl font-extrabold text-center text-[#5EA85B] mb-10 md:mb-14">
              Mission &amp; Vision
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Mission Card */}
            <FadeUp delay={0.1}>
              <div className="relative bg-white rounded-3xl p-8 md:p-10 h-full overflow-hidden shadow-sm">
                <span className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-[#5EA85B]/20" aria-hidden="true" />
                <div className="relative">
                  <div className="w-14 h-14 rounded-full bg-[#5EA85B]/70 text-[#5EA85B] flex items-center justify-center mb-6">
                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <circle cx="12" cy="12" r="6" />
                      <circle cx="12" cy="12" r="2" />
                    </svg>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-[#5EA85B] mb-4">
                    Our Mission
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-5">
                    To provide a warm, engaging, and thoughtfully designed micro preschool experience that blends play-based and experiential learning.
                  </p>
                </div>
              </div>
            </FadeUp>

            {/* Vision Card */}
            <FadeUp delay={0.2}>
              <div className="relative bg-white rounded-3xl p-8 md:p-10 h-full overflow-hidden shadow-sm">
                <span className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-[#F6892A]/20" aria-hidden="true" />
                <div className="relative">
                  <div className="w-14 h-14 rounded-full bg-[#F6892A]/70 text-[#F6892A] flex items-center justify-center mb-6">
                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l1.6 5.4L19 9l-5.4 1.6L12 16l-1.6-5.4L5 9l5.4-1.6z" />
                      <path d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-[#F6892A] mb-4">
                    Our Vision
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-5">
                    To create a nurturing, child-centered learning environment where each child feels safe, inspired, and empowered to LEARN, EXPRESS and GROW.
                  </p>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Teaching Philosophy */}
      <section className="bg-[#FAF7EC] py-12 md:py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <h2 className="text-3xl md:text-5xl font-extrabold text-center text-[#F6892A] mb-3">
              Teaching Philosophy
            </h2>
            <p className="text-center text-gray-600 mb-10 md:mb-14">
              The core principles that guide our approach
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {[
              {
                title: "Child-Led Learning",
                body: "Children choose experiences based on their interests and developmental readiness",
                bg: "bg-[#5EA85B]/30",
                titleColor: "text-[#5EA85B]",
                iconBg: "bg-[#5EA85B]/50",
                iconColor: "text-[#5EA85B]",
                iconPath: "M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z",
              },
              {
                title: "Hands-On Exploration",
                body: "Learning through touch, manipulation, and sensory experiences",
                bg: "bg-[#F2DA36]/70",
                titleColor: "text-[#F6892A]",
                iconBg: "bg-[#F6892A]/50",
                iconColor: "text-[#F6892A]",
                iconPath: "M9 11h6M12 8v6M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-3l-2-2h-4l-2 2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z",
              },
              {
                title: "Practical Life Skills",
                body: "Building independence through real-world experiences and responsibilities",
                bg: "bg-[#F6892A]/25",
                titleColor: "text-[#F6892A]",
                iconBg: "bg-[#F6892A]/50",
                iconColor: "text-[#F6892A]",
                iconPath: "M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z",
              },
              {
                title: "Respect & Empathy",
                body: "Fostering kindness, understanding, and peaceful conflict resolution",
                bg: "bg-[#0FB3BC]/25",
                titleColor: "text-[#0FB3BC]",
                iconBg: "bg-[#0FB3BC]/50",
                iconColor: "text-[#0FB3BC]",
                iconPath: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z",
              },
              {
                title: "Independence",
                body: "Encouraging self-directed activity and decision-making capabilities",
                bg: "bg-[#F8D17C]/80",
                titleColor: "text-[#F6892A]",
                iconBg: "bg-[#F6892A]/50",
                iconColor: "text-[#F6892A]",
                iconPath: "M5 12h14M12 5l7 7-7 7",
              },
              {
                title: "Natural Curiosity",
                body: "Nurturing the innate desire to explore and understand the world",
                bg: "bg-[#5EA85B]/50",
                titleColor: "text-[#5EA85B]",
                iconBg: "bg-[#5EA85B]/70",
                iconColor: "text-[#5EA85B]",
                iconPath: "M11 19a8 8 0 1 1 5.66-2.34L21 21",
              },
            ].map((card, i) => (
              <FadeUp key={card.title} delay={i * 0.05}>
                <div className={`${card.bg} rounded-2xl p-6 md:p-7 h-full`}>
                  <div className={`${card.iconBg} ${card.iconColor} w-10 h-10 rounded-lg flex items-center justify-center mb-4`}>
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d={card.iconPath} />
                    </svg>
                  </div>
                  <h3 className={`text-lg md:text-xl font-extrabold ${card.titleColor} mb-2`}>
                    {card.title}
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {card.body}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Founders */}
      <section className="bg-[#F4EFE6] py-12 md:py-20 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <h2 className="text-3xl md:text-5xl font-extrabold text-center text-[#5EA85B] mb-12 md:mb-16">
              Meet the Founders
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 md:gap-16 max-w-3xl mx-auto">
            {[
              {
                name: "Nikita Sharma",
                title: "Founder",
                bio: [
                  "Nikita Sharma, founder of Ukti, is a transformative force in early childhood education with 8 years of experience blending innovation, care, and a deep commitment to nurturing young minds. Her journey began as a preschool teacher, where she developed a strong belief in the power of early learning—an insight that led her to create Ukti as a space where children can truly learn, express, and grow without limits.",
                  "Through her learner-centric approach, she has positively impacted children’s lives while championing more holistic, flexible teaching practices. She envisions an education system that is accessible, empathetic, and creatively empowering for every child.",
                ],
                nameColor: "text-[#5EA85B]",
                badgeColor: "bg-[#5EA85B]",
              },
              {
                name: "Adeeba Arif",
                title: "Co-Founder",
                bio: [
                  "Adeeba Arif, co-founder of Ukti, brings 10 years of experience in early childhood education and a deep commitment to creating nurturing, child-centric learning environments that honor each child’s potential. Her extensive work as a preschool teacher across reputed institutions shaped her understanding of young learners and inspired her, alongside Nikita Sharma, to build Ukti as a space where children can learn freely beyond rigid structures.",
                  "At Ukti, she focuses on holistic development through play, exploration, and guided discovery, making learning joyful and meaningful while continuing to challenge conventional methods with a thoughtful, child-focused vision of education.",
                ],
                nameColor: "text-[#F6892A]",
                badgeColor: "bg-[#F6892A]",
              },
            ].map((founder, i) => (
              <FadeUp key={founder.name} delay={i * 0.1}>
                <div className="text-center">
                  <div className="relative w-40 h-40 md:w-48 md:h-48 mx-auto mb-5">
                    <div className="w-full h-full rounded-full bg-gray-300 overflow-hidden flex items-center justify-center border-4 border-white shadow-lg ring-1 ring-black/5">
                      {images[i + 2] ? (
                        <Image
                          src={images[i + 2]}
                          alt={founder.name}
                          width={192}
                          height={192}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-gray-500 text-xs">Photo</span>
                      )}
                    </div>
                    <span className={`absolute bottom-1 right-1 ${founder.badgeColor} w-10 h-10 rounded-full flex items-center justify-center text-white shadow-md`}>
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                    </span>
                  </div>
                  <h3 className={`text-xl md:text-2xl font-extrabold ${founder.nameColor} mb-1`}>
                    {founder.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{founder.title}</p>
                  <div className="space-y-3 text-gray-700 text-sm leading-relaxed text-left">
                    {founder.bio.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Montessori Principles */}
      <section className="bg-[#FAF7EC] py-12 md:py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <h2 className="text-3xl md:text-5xl font-extrabold text-center text-[#F6892A] mb-10 md:mb-14">
              Montessori Principles
            </h2>
          </FadeUp>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {[
              {
                title: "Prepared Environment",
                iconPath:
                  "M3 12l9-9 9 9M5 10v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V10",
                color: "text-[#5EA85B]",
              },
              {
                title: "Self-Directed Activity",
                iconPath:
                  "M12 2l1.6 5.4L19 9l-5.4 1.6L12 16l-1.6-5.4L5 9l5.4-1.6zM19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8z",
                color: "text-[#F2DA36]",
              },
              {
                title: "Mixed-Age Learning",
                iconPath:
                  "M12 7a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-4 7a4 4 0 0 1 8 0v8H8v-8z",
                color: "text-[#F6892A]",
              },
              {
                title: "Freedom Within Limits",
                iconPath:
                  "M12 22a10 10 0 1 0-10-10M12 18a6 6 0 1 0-6-6M12 14a2 2 0 1 0-2-2",
                color: "text-[#5EA85B]",
              },
            ].map((item, i) => (
              <FadeUp key={item.title} delay={i * 0.05}>
                <div className="bg-white rounded-2xl p-6 md:p-7 h-full flex flex-col items-center text-center shadow-sm">
                  <div className={`w-14 h-14 mb-4 flex items-center justify-center ${item.color}`}>
                    <svg className="w-10 h-10" viewBox="0 0 24 24" fill={item.color === "text-[#F2DA36]" ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d={item.iconPath} />
                    </svg>
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-[#5EA85B]">
                    {item.title}
                  </h3>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Our Learning Environment */}
      <section className="bg-[#F4EFE6] py-12 md:py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <h2 className="text-3xl md:text-5xl font-extrabold text-center text-[#5EA85B] mb-3">
              Our Learning Environment
            </h2>
            <p className="text-center text-gray-600 mb-10 md:mb-14">
              Spaces designed for exploration and discovery
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {[
              "Creative Arts Corner",
              "Play & Discovery",
              "Montessori Materials",
              "Learning Together",
              "Outdoor Adventures",
              "Our Community",
            ].map((label, i) => (
              <FadeUp key={label} delay={i * 0.05}>
                <div className="relative w-full aspect-[5/4] rounded-2xl overflow-hidden bg-gray-300 group">
                  {images[i + 4] ? (
                    <Image
                      src={images[i + 4]}
                      alt={label}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <span className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm">
                      Image Placeholder
                    </span>
                  )}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4">
                    <p className="text-white font-semibold text-sm md:text-base">
                      {label}
                    </p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Why Families Trust Us */}
      <section className="bg-[#FAF7EC] py-12 md:py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <h2 className="text-3xl md:text-5xl font-extrabold text-center text-[#F6892A] mb-10 md:mb-14">
              Why Families Trust Us
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {[
              {
                title: "Safe Environment",
                body: "Fully secure, child-proofed spaces with constant supervision",
                bg: "bg-[#5EA85B]/25",
                titleColor: "text-[#5EA85B]",
                iconBg: "bg-[#5EA85B]/60",
                iconColor: "text-[#5EA85B]",
                icon: (
                  <path d="M12 2l8 4v6c0 5-3.5 9.5-8 10-4.5-.5-8-5-8-10V6l8-4z" />
                ),
              },
              {
                title: "Trained Teachers",
                body: "Certified Montessori educators with years of experience",
                bg: "bg-[#F6892A]/25",
                titleColor: "text-[#F6892A]",
                iconBg: "bg-[#F6892A]/60",
                iconColor: "text-[#F6892A]",
                icon: (
                  <>
                    <circle cx="9" cy="8" r="3" />
                    <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
                    <circle cx="17" cy="9" r="2" />
                    <path d="M21 21v-1a3 3 0 0 0-3-3" />
                  </>
                ),
              },
              {
                title: "Personal Attention",
                body: "Low student-teacher ratio ensures individual care",
                bg: "bg-[#0FB3BC]/25",
                titleColor: "text-[#0FB3BC]",
                iconBg: "bg-[#0FB3BC]/60",
                iconColor: "text-[#0FB3BC]",
                icon: (
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                ),
              },
              {
                title: "Holistic Growth",
                body: "Focus on social, emotional, physical & cognitive development",
                bg: "bg-[#F2DA36]/60",
                titleColor: "text-[#5EA85B]",
                iconBg: "bg-[#5EA85B]/60",
                iconColor: "text-[#5EA85B]",
                icon: (
                  <>
                    <path d="M12 2l1.6 5.4L19 9l-5.4 1.6L12 16l-1.6-5.4L5 9l5.4-1.6z" />
                    <path d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8z" />
                  </>
                ),
              },
            ].map((card, i) => (
              <FadeUp key={card.title} delay={i * 0.05}>
                <div className={`${card.bg} rounded-2xl p-6 md:p-8 h-full flex flex-col items-center text-center shadow-sm`}>
                  <div className={`${card.iconBg} ${card.iconColor} w-16 h-16 rounded-full flex items-center justify-center mb-5`}>
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {card.icon}
                    </svg>
                  </div>
                  <h3 className={`text-lg md:text-xl font-extrabold ${card.titleColor} mb-3`}>
                    {card.title}
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {card.body}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
