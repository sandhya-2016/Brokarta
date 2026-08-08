import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting database seed...");

  // 1. Seed / Update Admin User
  const email = "admin@brokarta.com";
  const passwordHash = await bcrypt.hash("8989", 10);

  const adminUser = await prisma.adminUser.upsert({
    where: { email },
    update: {
      passwordHash,
      isActive: true,
    },
    create: {
      name: "Admin User",
      email,
      passwordHash,
      role: "ADMIN",
      isActive: true,
    },
  });
  console.log("Seeded/Updated Admin User successfully (admin@brokarta.com)");

  // Clear existing items to allow clean re-runs of seed script
  await prisma.communityTestimonial.deleteMany({});
  await prisma.storyBullet.deleteMany({});
  await prisma.storyPanel.deleteMany({});
  await prisma.workflowItem.deleteMany({});
  await prisma.lead.deleteMany({});
  await prisma.sEOPage.deleteMany({});
  await prisma.pageText.deleteMany({});
  await prisma.appUrl.deleteMany({});

  console.log("Cleared old records.");

  // 2. Seed 15 Community Testimonials
  const testimonials = [
    { name: "James Thompson", testimonial: "Brokarta has completely transformed how our team manages B2B real estate leads and co-broking deals.", imageUrl: "https://i.pravatar.cc/150?u=james", isActive: true, sortOrder: 0 },
    { name: "Sarah Jenkins", testimonial: "The interface is so intuitive—it streamlined our agency's daily workflow within days!", imageUrl: "https://i.pravatar.cc/150?u=sarah", isActive: true, sortOrder: 1 },
    { name: "Marcus Wright", testimonial: "Finally, a digital ecosystem designed specifically for the realities of modern real estate brokers.", imageUrl: "https://i.pravatar.cc/150?u=marcus", isActive: true, sortOrder: 2 },
    { name: "Elena Rodriguez", testimonial: "The verified broker network gives us total confidence when sharing high-value property listings.", imageUrl: "https://i.pravatar.cc/150?u=elena", isActive: true, sortOrder: 3 },
    { name: "Aria Vance", testimonial: "The platform's speed and sleek design make managing partner inquiries effortless.", imageUrl: "https://i.pravatar.cc/150?u=aria", isActive: true, sortOrder: 4 },
    { name: "David Kim", testimonial: "Connecting with other verified brokers has never been this simple and transparent.", imageUrl: "https://i.pravatar.cc/150?u=david", isActive: true, sortOrder: 5 },
    { name: "Emma Watson", testimonial: "Highly recommended for real estate professionals. Makes co-broking completely stress-free.", imageUrl: "https://i.pravatar.cc/150?u=emma", isActive: true, sortOrder: 6 },
    { name: "Carlos Mendez", testimonial: "The inventory sharing dashboard is brilliant and updates listing statuses in real time.", imageUrl: "https://i.pravatar.cc/150?u=carlos", isActive: true, sortOrder: 7 },
    { name: "Priya Patel", testimonial: "Excellent platform support and a beautiful aesthetic. Truly a premium experience.", imageUrl: "https://i.pravatar.cc/150?u=priya", isActive: true, sortOrder: 8 },
    { name: "Liam O'Connor", testimonial: "Helped our agency scale closed deals by 35% within the very first month of joining.", imageUrl: "https://i.pravatar.cc/150?u=liam", isActive: true, sortOrder: 9 },
    { name: "Chloe Dubois", testimonial: "The security protocols and verification standards are second to none in the industry.", imageUrl: "https://i.pravatar.cc/150?u=chloe", isActive: true, sortOrder: 10 },
    { name: "Yuki Tanaka", testimonial: "User experience is exceptionally polished. Our commercial agents love using it daily.", imageUrl: "https://i.pravatar.cc/150?u=yuki", isActive: true, sortOrder: 11 },
    { name: "Alexander Gross", testimonial: "The interactive journey timeline and matching engine are incredibly innovative.", imageUrl: "https://i.pravatar.cc/150?u=alex", isActive: false, sortOrder: 12 },
    { name: "Fatima Al-Sayed", testimonial: "Makes sharing client requirements and matching prospective leads completely seamless.", imageUrl: "https://i.pravatar.cc/150?u=fatima", isActive: false, sortOrder: 13 },
    { name: "Yuri Boyka", testimonial: "Solid platform with fast response times and dependable data privacy for dealmakers.", imageUrl: "https://i.pravatar.cc/150?u=yuri", isActive: true, sortOrder: 14 }
  ];

  await prisma.communityTestimonial.createMany({ data: testimonials });
  console.log(`Seeded ${testimonials.length} Testimonials.`);

  // 3. Seed Story Panels with Bullets and Valid Image Paths
  const panels = [
    {
      title: "Every Broker Has A Story",
      description: "Real estate brokerage is built on effort, relationships, and persistence. Yet too often, brokers are slowed down by unverified listings, scattered conversations, and tools that weren't made for them.",
      imageUrl: "/images/about-us/story-1.png",
      accentColor: "#f6a200",
      gradientFrom: "from-[#FFF9F2]",
      gradientTo: "to-[#FFF1E0]",
      quote: "Collaboration is seamless, not stressful.",
      quoteBadge: "Verified Networks",
      isActive: true,
      sortOrder: 0,
      bullets: ["Lack of real-time inventory", "Chasing unverified leads", "Deals that almost closed"]
    },
    {
      title: "We Saw The Gap",
      description: "Everywhere, the pattern is clear: brokers spend more time managing disorganization than closing deals. Traditional tools were not built for the fast-paced realities of modern real estate professionals.",
      imageUrl: "/images/about-us/story-2.jpeg",
      accentColor: "#00cc9c",
      gradientFrom: "from-[#F0F9F7]",
      gradientTo: "to-[#D8ECE9]",
      quote: "Empowering brokers with smart data.",
      quoteBadge: "Tech-First Network",
      isActive: true,
      sortOrder: 1,
      bullets: ["Trust was difficult to establish", "Collaboration lacked structure", "Growth felt harder than it should"]
    },
    {
      title: "Why Brokarta Was Born",
      description: "Brokarta is a broker-first digital platform built to bring clarity where there was confusion, and structure where there was fragmentation. We believe that when brokers collaborate with confidence, their potential is limitless.",
      imageUrl: "/images/about-us/story-3.png",
      accentColor: "#f6a200",
      gradientFrom: "from-[#FFF9F2]",
      gradientTo: "to-[#FFF1E0]",
      quote: "Handshakes turned into closed deals.",
      quoteBadge: "Growth Engine",
      isActive: true,
      sortOrder: 2,
      bullets: ["Listings and leads stay organized", "Brokers connect with confidence", "Reputation grows with every deal"]
    },
    {
      title: "The Future of Brokerage",
      description: "We are building a smart, secure network where verified brokers co-broke instantly, secure their commissions, and scale their businesses without borders. Welcome to the new era of dealmaking.",
      imageUrl: "/images/about-us/story-4.png",
      accentColor: "#00cc9c",
      gradientFrom: "from-[#F0F9F7]",
      gradientTo: "to-[#D8ECE9]",
      quote: "Fast co-broking for the digital age.",
      quoteBadge: "Brokarta Future",
      isActive: true,
      sortOrder: 3,
      bullets: ["Real-time collaborative workspace", "Verified co-broke matches", "Instant, secure communication"]
    },
    {
      title: "Building Global Networks",
      description: "Our community spreads across regional borders, aligning brokers from diverse brokerages into a single collaborative cloud workspace.",
      imageUrl: "/images/about-us/aboutus.jpg",
      accentColor: "#f6a200",
      gradientFrom: "from-[#FFF9F2]",
      gradientTo: "to-[#FFF1E0]",
      quote: "No boundaries to networking.",
      quoteBadge: "Global Cloud",
      isActive: true,
      sortOrder: 4,
      bullets: ["Cross-border connections", "Multi-currency valuations", "Standardized legal contracts"]
    }
  ];

  for (const p of panels) {
    await prisma.storyPanel.create({
      data: {
        title: p.title,
        description: p.description,
        imageUrl: p.imageUrl,
        accentColor: p.accentColor,
        gradientFrom: p.gradientFrom,
        gradientTo: p.gradientTo,
        quote: p.quote,
        quoteBadge: p.quoteBadge,
        isActive: p.isActive,
        sortOrder: p.sortOrder,
        bullets: {
          create: p.bullets.map((bulletText) => ({ bulletText }))
        }
      }
    });
  }
  console.log(`Seeded ${panels.length} Story Panels.`);

  // 4. Seed 5 Workflow Items with Valid Image Paths
  const workflows = [
    { title: "Discovery", heading1: "Verified Brokers,", heading2: "Real Connections", description: "Find the right inventory and opportunities without the noise.", imageUrl: "/images/what-we-offer/discovery.png", isActive: true, sortOrder: 0 },
    { title: "Closure", heading1: "Structured Listings,", heading2: "Smarter Discovery", description: "Smarter workflows lead to faster closures and stronger relationships.", imageUrl: "/images/what-we-offer/closure.png", isActive: true, sortOrder: 1 },
    { title: "Connection", heading1: "Collaborate Faster,", heading2: "Close Better", description: "Every meaningful deal starts with a trusted connection.", imageUrl: "/images/what-we-offer/connect.png", isActive: true, sortOrder: 2 },
    { title: "Collaboration", heading1: "From Connection", heading2: "to Closure", description: "Work together, share inventory, and move deals forward with confidence.", imageUrl: "/images/what-we-offer/collaboration.png", isActive: true, sortOrder: 3 },
    { title: "Verification", heading1: "Zero Spam,", heading2: "100% Trust", description: "Every agent profile is checked and certified by the regional board.", imageUrl: "/images/what-we-offer/discovery.png", isActive: true, sortOrder: 4 }
  ];

  await prisma.workflowItem.createMany({ data: workflows });
  console.log(`Seeded ${workflows.length} Workflow Items.`);

  // 5. Seed 15 CRM Leads with realistic metadata
  const leads = [
    { fullName: "Raj Patel", email: "raj@patelrealty.com", phoneNumber: "9876543210", userType: "BROKER", lookingFor: "JOIN_AS_BROKER", companyName: "Patel Realty", companyRole: "Principal Broker", feedback: "Hi team, I would like to register my agents for access.", status: "PENDING", createdAt: new Date("2026-07-01T10:00:00Z") },
    { fullName: "Samantha Smith", email: "sam@agencyprime.com", phoneNumber: "8765432109", userType: "AGENCY", lookingFor: "BOOK_A_DEMO", companyName: "Agency Prime", companyRole: "Operations Director", feedback: "Would love to see a demo of the co-broking pipeline.", status: "CONTACTED", createdAt: new Date("2026-07-02T11:30:00Z") },
    { fullName: "John Doe", email: "john@doehomes.com", phoneNumber: "7654321098", userType: "OTHERS", lookingFor: "ENTERPRISE_USE", companyName: "Doe & Co", companyRole: "CEO", feedback: "Do you offer API integrations for corporate CRM?", status: "QUALIFIED", createdAt: new Date("2026-07-03T09:15:00Z") },
    { fullName: "Linda Chang", email: "linda@changproperties.com", phoneNumber: "9654321987", userType: "BROKER", lookingFor: "SUPPORT_QUERY", companyName: "Chang Properties", companyRole: "Partner", feedback: "We have some questions about commission guarantees.", status: "CLOSED", createdAt: new Date("2026-07-04T16:45:00Z") },
    { fullName: "Michael Brown", email: "mike@brownagents.com", phoneNumber: "6543210987", userType: "BROKER", lookingFor: "SUPPORT_QUERY", companyName: "Brown Agents", companyRole: "Associate Agent", feedback: "Just testing out platform integrations.", status: "REJECTED", createdAt: new Date("2026-07-04T12:00:00Z") },
    { fullName: "Chloe Dubois", email: "chloe@duboisgroup.fr", phoneNumber: "9123456780", userType: "AGENCY", lookingFor: "JOIN_AS_BROKER", companyName: "Dubois Real Estate", companyRole: "Director", feedback: "Interested in regional matching engines.", status: "PENDING", createdAt: new Date("2026-07-05T08:00:00Z") },
    { fullName: "Yuki Tanaka", email: "tanaka@tokyoliving.jp", phoneNumber: "8123456789", userType: "BROKER", lookingFor: "BOOK_A_DEMO", companyName: "Tokyo Living", companyRole: "Founder", feedback: "Looking to co-broke with agents in EMEA.", status: "CONTACTED", createdAt: new Date("2026-07-05T14:20:00Z") },
    { fullName: "David Beckham", email: "david@realtorsunited.co.uk", phoneNumber: "9988776655", userType: "BROKER", lookingFor: "JOIN_AS_BROKER", companyName: "Realtors United", companyRole: "Lead Broker", feedback: "Let's connect next week.", status: "PENDING", createdAt: new Date("2026-07-06T09:00:00Z") },
    { fullName: "Anna Kovalenko", email: "anna@kovalestates.com", phoneNumber: "9955331100", userType: "BROKER", lookingFor: "BOOK_A_DEMO", companyName: "Koval Estates", companyRole: "Broker Owner", feedback: "We need a faster co-broking workspace.", status: "PENDING", createdAt: new Date("2026-07-06T10:15:00Z") },
    { fullName: "George Costanza", email: "george@vandelay.com", phoneNumber: "9001112222", userType: "OTHERS", lookingFor: "SUPPORT_QUERY", companyName: "Vandelay Real Estate", companyRole: "Property Manager", feedback: "Inquiring about platform access.", status: "PENDING", createdAt: new Date("2026-07-06T11:00:00Z") },
    { fullName: "Tony Stark", email: "tony@starkrealty.com", phoneNumber: "9998887777", userType: "OTHERS", lookingFor: "ENTERPRISE_USE", companyName: "Stark Realty Group", companyRole: "Managing Director", feedback: "Interested in automated deal management.", status: "QUALIFIED", createdAt: new Date("2026-07-06T12:00:00Z") },
    { fullName: "Bruce Wayne", email: "bruce@wayneestates.com", phoneNumber: "9119119111", userType: "AGENCY", lookingFor: "JOIN_AS_BROKER", companyName: "Wayne Estates", companyRole: "Principal Owner", feedback: "Seeking high-privacy co-broking network.", status: "CLOSED", createdAt: new Date("2026-07-06T12:30:00Z") },
    { fullName: "Peter Parker", email: "peter@dailybugle.com", phoneNumber: "9222223333", userType: "OTHERS", lookingFor: "BOOK_A_DEMO", companyName: "Bugle Realty Media", companyRole: "Media Director", feedback: "Scheduling a demonstration.", status: "REJECTED", createdAt: new Date("2026-07-06T13:00:00Z") },
    { fullName: "Clark Kent", email: "clark@dailyplanet.com", phoneNumber: "9333334444", userType: "OTHERS", lookingFor: "SUPPORT_QUERY", companyName: "Daily Planet Realty", companyRole: "Communications Lead", feedback: "Inquiring about broker verification criteria.", status: "PENDING", createdAt: new Date("2026-07-06T13:45:00Z") },
    { fullName: "Selina Kyle", email: "selina@catproperties.com", phoneNumber: "9444445555", userType: "BROKER", lookingFor: "JOIN_AS_BROKER", companyName: "Cat Properties", companyRole: "Broker Agent", feedback: "Fast co-broking platform looks very promising.", status: "PENDING", createdAt: new Date("2026-07-06T14:15:00Z") }
  ];

  await prisma.lead.createMany({ data: leads });
  console.log(`Seeded ${leads.length} Leads.`);

  // 6. Seed SEO Pages metadata
  const seoPages = [
    { pageKey: "home", metaTitle: "Brokarta | Community Broker Network", metaDescription: "The digital network for the modern real estate broker. Connect with peers, collaborate on deals, and grow your network.", keywords: "real estate, broker, co-broke, listing database, property matches, networking", canonicalUrl: "https://brokarta.com/" },
    { pageKey: "about-us", metaTitle: "About Us | The Brokarta Story", metaDescription: "We saw the gap and built a broker-first digital platform to bring clarity where there was confusion.", keywords: "about brokarta, broker history, networking founders, brokarta mission", canonicalUrl: "https://brokarta.com/about-us" },
    { pageKey: "what-we-offer", metaTitle: "What We Offer | Professional Co-Broking Workflow", metaDescription: "Streamlined broker workflow from discovery, matching, secure chat, all the way to closure.", keywords: "real estate workflows, broker app features, listing verify, deal closure", canonicalUrl: "https://brokarta.com/what-we-offer" },
    { pageKey: "become-a-user", metaTitle: "Join Brokarta | Digital Networking for Realtors", metaDescription: "Become a verified user to co-broke instantly, find matches, and secure commissions.", keywords: "join network, realtor access, register broker account", canonicalUrl: "https://brokarta.com/become-a-user" },
    { pageKey: "connect-now", metaTitle: "Connect Now | Partner Inquiries", metaDescription: "Let's build the future of brokerage together. Send our principal network team your inquiries.", keywords: "contact brokarta, deal book demo, support query", canonicalUrl: "https://brokarta.com/connect-now" }
  ];

  await prisma.sEOPage.createMany({ data: seoPages });
  console.log(`Seeded ${seoPages.length} SEO Pages.`);

  console.log("Database seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error during seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
