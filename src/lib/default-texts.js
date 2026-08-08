export const DEFAULT_TEXTS = {
  home: {
    name: "Home Welcome Page",
    path: "/",
    fields: [
      // Hero Header Section
      { key: "hero.titleLetter", label: "Hero Title Highlight Letter", default: "C", type: "input", section: "Hero Banner" },
      { key: "hero.titleLine1", label: "Hero Title Part 1", default: "onnect &", type: "input", section: "Hero Banner" },
      { key: "hero.titleLine2", label: "Hero Title Part 2", default: "ollaborate", type: "input", section: "Hero Banner" },
      { key: "hero.subtitle", label: "Hero Subtitle", default: "The Network for the Modern Real Estate Broker.", type: "input", section: "Hero Banner" },
      { key: "hero.description", label: "Hero Description", default: "Grow your network on one powerful platform, built exclusively for real estate professionals", type: "textarea", section: "Hero Banner" },
      { key: "hero.downloadOn", label: "App Store Badge Label", default: "DOWNLOAD ON", type: "input", section: "Hero Banner" },
      { key: "hero.appStore", label: "App Store Name", default: "App Store", type: "input", section: "Hero Banner" },
      { key: "hero.getItOn", label: "Google Play Badge Label", default: "GET IT ON", type: "input", section: "Hero Banner" },
      { key: "hero.googlePlay", label: "Google Play Store Name", default: "Google Play", type: "input", section: "Hero Banner" },
      { key: "hero.scanTo", label: "Scan Badge Label", default: "SCAN TO", type: "input", section: "Hero Banner" },
      { key: "hero.download", label: "Scan Download Label", default: "Download", type: "input", section: "Hero Banner" },
      { key: "hero.qrTooltip", label: "QR Code Tooltip Text", default: "Hover to scan & download", type: "input", section: "Hero Banner" },
      { key: "hero.watchDemo", label: "Watch Demo Badge", default: "WATCH THE DEMO", type: "input", section: "Hero Banner" },

      // Platform Overview Section
      { key: "project.typingLine1", label: "Typing Line 1", default: "The Smarter Digital Platform", type: "input", section: "Platform Overview" },
      { key: "project.typingLine2", label: "Typing Line 2", default: "For Broker Growth.", type: "input", section: "Platform Overview" },
      { key: "project.description1", label: "Overview Paragraph 1", default: "Brokarta is a verified network built exclusively for real estate brokers- enabling structured lead discovery, intelligent listings, and seamless deal collaboration.", type: "textarea", section: "Platform Overview" },
      { key: "project.description2", label: "Overview Paragraph 2", default: "It replaces fragmented chat groups, social pages, and unstructured networks with one clean, trusted, broker-only ecosystem- built for faster closes and stronger professional connections.", type: "textarea", section: "Platform Overview" },
      { key: "project.stats.listingsLabel", label: "Listings Metric Label", default: "Active Listings", type: "input", section: "Platform Overview" },
      { key: "project.stats.listingsSuffix", label: "Listings Suffix", default: "K+", type: "input", section: "Platform Overview" },
      { key: "project.stats.usersLabel", label: "Users Metric Label", default: "Verified & Active Users", type: "input", section: "Platform Overview" },
      { key: "project.stats.usersSuffix", label: "Users Suffix", default: "K+", type: "input", section: "Platform Overview" },
      { key: "project.stats.downloadsLabel", label: "Downloads Metric Label", default: "App Downloads", type: "input", section: "Platform Overview" },
      { key: "project.stats.downloadsSuffix", label: "Downloads Suffix", default: "k", type: "input", section: "Platform Overview" },
      { key: "project.features.verified.badge", label: "Feature 1 Badge", default: "Verified", type: "input", section: "Platform Overview" },
      { key: "project.features.verified.title", label: "Feature 1 Title", default: "Broker Network", type: "input", section: "Platform Overview" },
      { key: "project.features.smart.badge", label: "Feature 2 Badge", default: "Smart", type: "input", section: "Platform Overview" },
      { key: "project.features.smart.title", label: "Feature 2 Title", default: "Lead Discovery", type: "input", section: "Platform Overview" },
      { key: "project.features.intelligent.badge", label: "Feature 3 Badge", default: "Intelligent", type: "input", section: "Platform Overview" },
      { key: "project.features.intelligent.title", label: "Feature 3 Title", default: "Property Listings", type: "input", section: "Platform Overview" },

      // Story Panels Section
      { key: "story.headingPrefix", label: "Story Header Line 1", default: "Grow Faster.", type: "input", section: "Interactive Story Showcase" },
      { key: "story.headingHighlight", label: "Story Header Line 2 (Highlighted)", default: "Close Smarter.", type: "input", section: "Interactive Story Showcase" },
      { key: "story.headingSuffix", label: "Story Header Line 3", default: "Everything a Broker needs.", type: "input", section: "Interactive Story Showcase" },

      { key: "story.feature1.title", label: "Panel 1 Title (Verified Network)", default: "Verified Network", type: "input", section: "Interactive Story Showcase" },
      { key: "story.feature1.desc", label: "Panel 1 Description", default: "Connect with brokers who are active—not names sitting in a dead database.", type: "textarea", section: "Interactive Story Showcase" },

      { key: "story.feature2.title", label: "Panel 2 Title (Property Alerts)", default: "Property Alerts", type: "input", section: "Interactive Story Showcase" },
      { key: "story.feature2.desc", label: "Panel 2 Description", default: "Get notified when new properties match your search.", type: "textarea", section: "Interactive Story Showcase" },

      { key: "story.feature3.title", label: "Panel 3 Title (Intelligent Listings)", default: "Intelligent Listings", type: "input", section: "Interactive Story Showcase" },
      { key: "story.feature3.desc", label: "Panel 3 Description", default: "Listings built by brokers, for brokers—every detail a deal actually needs.", type: "textarea", section: "Interactive Story Showcase" },

      { key: "story.feature4.title", label: "Panel 4 Title (Structured Collaboration)", default: "Structured Collaboration", type: "input", section: "Interactive Story Showcase" },
      { key: "story.feature4.desc", label: "Panel 4 Description", default: "One workspace for co-broking and referrals—built around how brokers really close deals.", type: "textarea", section: "Interactive Story Showcase" },

      { key: "story.feature5.title", label: "Panel 5 Title (Profile Score)", default: "Profile Score", type: "input", section: "Interactive Story Showcase" },
      { key: "story.feature5.desc", label: "Panel 5 Description", default: "A higher profile score makes your real estate profile more credible.", type: "textarea", section: "Interactive Story Showcase" },

      { key: "story.feature6.title", label: "Panel 6 Title (In-App Chat & Call)", default: "In-App Chat & Call", type: "input", section: "Interactive Story Showcase" },
      { key: "story.feature6.desc", label: "Panel 6 Description", default: "Connect with buyers and sellers securely without leaving the app.", type: "textarea", section: "Interactive Story Showcase" },

      // Community Testimonials Section
      { key: "testimonial.title", label: "Testimonials Main Title", default: "Our Growing Community", type: "input", section: "Testimonials & Community" },
    ]
  },
  "about-us": {
    name: "About Us Page",
    path: "/about-us",
    fields: [
      { key: "hero.titleLine1", label: "Hero Title Line 1", default: "WE ARE", type: "input", section: "Hero Banner" },
      { key: "hero.titleLine2", label: "Hero Title Line 2 (Highlighted)", default: "BROKARTA", type: "input", section: "Hero Banner" },
      { key: "hero.description", label: "Hero Description", default: "The digital infrastructure built exclusively for the modern real estate broker.", type: "textarea", section: "Hero Banner" },

      { key: "vision.standardPrefix", label: "Vision Header Line 1", default: "Defining the", type: "input", section: "Vision & Mission" },
      { key: "vision.standardHighlight", label: "Vision Header Highlight", default: "BROKARTA", type: "input", section: "Vision & Mission" },
      { key: "vision.standardSuffix", label: "Vision Header Line 2", default: "Standard", type: "input", section: "Vision & Mission" },
      { key: "vision.leftBadgePrefix", label: "Left Card Title Line 1", default: "Built for Brokers.", type: "input", section: "Vision & Mission" },
      { key: "vision.leftBadgeHighlight", label: "Left Card Title Highlight", default: "Designed for Growth.", type: "input", section: "Vision & Mission" },
      { key: "vision.leftDescription", label: "Left Card Description", default: "Brokarta is a next-generation digital platform created exclusively for real estate brokers who want to work smarter, close faster, and grow sustainably.", type: "textarea", section: "Vision & Mission" },
      { key: "vision.visionBadge", label: "Vision Badge Label", default: "Our Vision", type: "input", section: "Vision & Mission" },
      { key: "vision.visionText", label: "Vision Description", default: "To become the operating layer of the broker ecosystem formalizing how deals move, strengthening trust through verification, and letting collaboration scale across markets", type: "textarea", section: "Vision & Mission" },
      { key: "vision.missionBadge", label: "Mission Badge Label", default: "Our Mission", type: "input", section: "Vision & Mission" },
      { key: "vision.missionText", label: "Mission Description", default: "To build the essential digital infrastructure for real estate brokers uniting search, listings, B2B deals, profiles, and communication in one trusted platform", type: "textarea", section: "Vision & Mission" },

      { key: "orbit.headingPrefix", label: "Orbit Section Header Prefix", default: "What Changes", type: "input", section: "Future Orbit Pillars" },
      { key: "orbit.headingHighlight", label: "Orbit Section Header Highlight", default: "When You're on Brokarta", type: "input", section: "Future Orbit Pillars" },
      { key: "orbit.description", label: "Orbit Section Description", default: "Helping businesses save time, reduce operational costs, scale with confidence, and build trusted partnerships for long-term success.", type: "textarea", section: "Future Orbit Pillars" },
      { key: "orbit.point1.title", label: "Pillar 1 Title", default: "Build lasting partnerships", type: "input", section: "Future Orbit Pillars" },
      { key: "orbit.point1.desc", label: "Pillar 1 Description", default: "Trust backed by verification, not guesswork", type: "input", section: "Future Orbit Pillars" },
      { key: "orbit.point2.title", label: "Pillar 2 Title", default: "Scale with confidence", type: "input", section: "Future Orbit Pillars" },
      { key: "orbit.point2.desc", label: "Pillar 2 Description", default: "A foundation that grows as your network does", type: "input", section: "Future Orbit Pillars" },
      { key: "orbit.point3.title", label: "Pillar 3 Title", default: "Save time", type: "input", section: "Future Orbit Pillars" },
      { key: "orbit.point3.desc", label: "Pillar 3 Description", default: "Less chasing, more closing", type: "input", section: "Future Orbit Pillars" },
      { key: "orbit.point4.title", label: "Pillar 4 Title", default: "Reduce costs", type: "input", section: "Future Orbit Pillars" },
      { key: "orbit.point4.desc", label: "Pillar 4 Description", default: "One platform, not a patchwork of scattered tools", type: "input", section: "Future Orbit Pillars" },
    ]
  },
  "what-we-offer": {
    name: "What We Offer Page",
    path: "/what-we-offer",
    fields: [
      { key: "hero.titlePrefix", label: "Hero Title Prefix", default: "Fueling the Future of", type: "input", section: "Hero Banner" },
      { key: "hero.titleHighlight", label: "Hero Title Highlight", default: "Real Estate", type: "input", section: "Hero Banner" },
      { key: "hero.description", label: "Hero Description", default: "Discover the edge modern brokers are building on-not with just a tool but an ecosystem.", type: "textarea", section: "Hero Banner" },

      { key: "whyChoose.subtitle", label: "Why Choose Subtitle Badge", default: "Our Excellence", type: "input", section: "Why Choose Us" },
      { key: "whyChoose.titlePrefix", label: "Why Choose Title Prefix", default: "Why", type: "input", section: "Why Choose Us" },
      { key: "whyChoose.titleHighlight", label: "Why Choose Title Highlight", default: "Choose Us", type: "input", section: "Why Choose Us" },
      { key: "whyChoose.cardTitle", label: "Card Header Title", default: "Grow Faster With Brokarta", type: "input", section: "Why Choose Us" },
      { key: "whyChoose.cardDesc", label: "Card Paragraph Description", default: "Brokarta is more than a lead platform- it's a unified ecosystem built for B2B collaboration. We bring your partnerships, deals, and interactions into one flow, so nothing gets lost to scattered tools or disconnected chats. Better tracking. More visibility. More control.", type: "textarea", section: "Why Choose Us" },

      { key: "tour.headingLine1", label: "Platform Tour Header Line 1", default: "Your Journey", type: "input", section: "Platform Tour Workflow" },
      { key: "tour.headingLine2", label: "Platform Tour Header Line 2", default: "Starts Here", type: "input", section: "Platform Tour Workflow" },
      { key: "tour.stage1.title", label: "Step 1 Title (Get Verified)", default: "Get Verified", type: "input", section: "Platform Tour Workflow" },
      { key: "tour.stage1.desc", label: "Step 1 Description", default: "Get verified instantly and start listing in seconds. Every profile is checked and certified by the regional board- zero spam, 100% trust.", type: "textarea", section: "Platform Tour Workflow" },
      { key: "tour.stage2.title", label: "Step 2 Title (Build Your Profile)", default: "Build Your Profile", type: "input", section: "Platform Tour Workflow" },
      { key: "tour.stage2.desc", label: "Step 2 Description", default: "Turn your track record into a credible, verifiable real estate profile- not just a name and a phone number.", type: "textarea", section: "Platform Tour Workflow" },
      { key: "tour.stage3.title", label: "Step 3 Title (Search Inventory)", default: "Search Inventory", type: "input", section: "Platform Tour Workflow" },
      { key: "tour.stage3.desc", label: "Step 3 Description", default: "Explore thousands of listings with seamless precision, and find the right opportunities without the noise.", type: "textarea", section: "Platform Tour Workflow" },
      { key: "tour.stage4.title", label: "Step 4 Title (Smart Chat & Deals)", default: "Smart Chat & Deals", type: "input", section: "Platform Tour Workflow" },
      { key: "tour.stage4.desc", label: "Step 4 Description", default: "Connect directly with verified brokers, negotiate terms in private, and keep deal history organized in one place.", type: "textarea", section: "Platform Tour Workflow" },
      { key: "tour.stage5.title", label: "Step 5 Title (Deal Pipeline)", default: "Deal Pipeline", type: "input", section: "Platform Tour Workflow" },
      { key: "tour.stage5.desc", label: "Step 5 Description", default: "Track leads, site visits, negotiations, and closed deals in an interactive real-time broker pipeline.", type: "textarea", section: "Platform Tour Workflow" },
      { key: "tour.stage6.title", label: "Step 6 Title (Close Deals Faster)", default: "Close Deals Faster", type: "input", section: "Platform Tour Workflow" },
      { key: "tour.stage6.desc", label: "Step 6 Description", default: "Finalize transactions with complete confidence, track co-broking commissions, and build your long-term reputation.", type: "textarea", section: "Platform Tour Workflow" },
    ]
  },
  "become-a-user": {
    name: "Become A User Page",
    path: "/become-a-user",
    fields: [
      { key: "hero.titlePrefix", label: "Hero Title Prefix", default: "Network of", type: "input", section: "Hero Banner" },
      { key: "hero.titleHighlight", label: "Hero Title Highlight", default: "Tomorrow", type: "input", section: "Hero Banner" },
      { key: "hero.description", label: "Hero Tagline Description", default: "Join thousands of verified brokers already closing faster, collaborating smarter, and building a better real estate ecosystem—together.", type: "textarea", section: "Hero Banner" },

      { key: "welcome.headingPrefix", label: "New Era Title Prefix", default: "Welcome to the ", type: "input", section: "New Era Workspace" },
      { key: "welcome.headingHighlight", label: "New Era Title Highlight", default: "New Era", type: "input", section: "New Era Workspace" },
      { key: "welcome.headingSuffix", label: "New Era Title Suffix", default: " of Brokerage", type: "input", section: "New Era Workspace" },
      { key: "welcome.tabs.broker.badge", label: "Broker Tab Badge", default: "Broker Workspace", type: "input", section: "New Era Workspace" },
      { key: "welcome.tabs.agency.badge", label: "Agency Tab Badge", default: "Agency Workspace", type: "input", section: "New Era Workspace" },
      { key: "orchestrator.broker.question", label: "Broker Workspace Question", default: "What if your network was actually verified?", type: "input", section: "New Era Workspace" },
      { key: "orchestrator.broker.desc", label: "Broker Workspace Description", default: "Access a verified community of real estate professionals who are actively looking to partner, co-broker, and grow their businesses together.", type: "textarea", section: "New Era Workspace" },
      { key: "orchestrator.agency.question", label: "Agency Workspace Question", default: "What if your whole agency ran on one system?", type: "input", section: "New Era Workspace" },
      { key: "orchestrator.agency.desc", label: "Agency Workspace Description", default: "Give every agent in your agency the same powerful tools, clear visibility, and structured deal workflows—all in one place.", type: "textarea", section: "New Era Workspace" },
      { key: "welcome.toggle.broker", label: "Broker Switch Button", default: "Broker", type: "input", section: "New Era Workspace" },
      { key: "welcome.toggle.agency", label: "Agency Switch Button", default: "Agency", type: "input", section: "New Era Workspace" },

      { key: "timeline.step1.title", label: "Timeline Step 1 Main Title", default: "Trusted Connections", type: "input", section: "Journey Timeline" },
      { key: "timeline.step1.broker.title", label: "Step 1 Broker Title", default: "Verified Network", type: "input", section: "Journey Timeline" },
      { key: "timeline.step1.broker.desc", label: "Step 1 Broker Description", default: "Connect with trusted, vetted brokers.", type: "input", section: "Journey Timeline" },
      { key: "timeline.step1.agency.title", label: "Step 1 Agency Title", default: "Team Visibility", type: "input", section: "Journey Timeline" },
      { key: "timeline.step1.agency.desc", label: "Step 1 Agency Description", default: "See every agent's activity and listings in one place.", type: "input", section: "Journey Timeline" },
      { key: "timeline.step2.title", label: "Timeline Step 2 Main Title", default: "Deal Tracking, Simplified", type: "input", section: "Journey Timeline" },
      { key: "timeline.step2.broker.title", label: "Step 2 Broker Title", default: "Structured Deals", type: "input", section: "Journey Timeline" },
      { key: "timeline.step2.broker.desc", label: "Step 2 Broker Description", default: "Track leads through clear, transparent workflows.", type: "input", section: "Journey Timeline" },
      { key: "timeline.step2.agency.title", label: "Step 2 Agency Title", default: "Centralized Deals", type: "input", section: "Journey Timeline" },
      { key: "timeline.step2.agency.desc", label: "Step 2 Agency Description", default: "Track every mandate across your agency, not just one desk.", type: "input", section: "Journey Timeline" },
      { key: "timeline.step3.title", label: "Timeline Step 3 Main Title", default: "Reputation That Speaks", type: "input", section: "Journey Timeline" },
      { key: "timeline.step3.broker.title", label: "Step 3 Broker Title", default: "Visibility", type: "input", section: "Journey Timeline" },
      { key: "timeline.step3.broker.desc", label: "Step 3 Broker Description", default: "Showcase your expertise and track record.", type: "input", section: "Journey Timeline" },
      { key: "timeline.step3.agency.title", label: "Step 3 Agency Title", default: "Agency Reputation", type: "input", section: "Journey Timeline" },
      { key: "timeline.step3.agency.desc", label: "Step 3 Agency Description", default: "Build a verified profile for your brokerage as a whole.", type: "input", section: "Journey Timeline" },
      { key: "timeline.step4.title", label: "Timeline Step 4 Main Title", default: "Sharper Signal", type: "input", section: "Journey Timeline" },
      { key: "timeline.step4.broker.title", label: "Step 4 Broker Title", default: "Smart Matching", type: "input", section: "Journey Timeline" },
      { key: "timeline.step4.broker.desc", label: "Step 4 Broker Description", default: "Get surfaced to the right leads, not just more leads.", type: "input", section: "Journey Timeline" },
      { key: "timeline.step4.agency.title", label: "Step 4 Agency Title", default: "Team Insights", type: "input", section: "Journey Timeline" },
      { key: "timeline.step4.agency.desc", label: "Step 4 Agency Description", default: "Understand which agents and listings are driving results.", type: "input", section: "Journey Timeline" },
      { key: "timeline.step5.title", label: "Timeline Step 5 Main Title", default: "Built to Work Together", type: "input", section: "Journey Timeline" },
      { key: "timeline.step5.broker.title", label: "Step 5 Broker Title", default: "Direct Co-Broking", type: "input", section: "Journey Timeline" },
      { key: "timeline.step5.broker.desc", label: "Step 5 Broker Description", default: "Partner on mandates without middlemen or guesswork.", type: "input", section: "Journey Timeline" },
      { key: "timeline.step5.agency.title", label: "Step 5 Agency Title", default: "Unified Setup", type: "input", section: "Journey Timeline" },
      { key: "timeline.step5.agency.desc", label: "Step 5 Agency Description", default: "Bring every agent onto one consistent system, fast.", type: "input", section: "Journey Timeline" },
      { key: "timeline.step6.title", label: "Timeline Step 6 Main Title", default: "Everything, One Place", type: "input", section: "Journey Timeline" },
      { key: "timeline.step6.broker.title", label: "Step 6 Broker Title", default: "Time Saved", type: "input", section: "Journey Timeline" },
      { key: "timeline.step6.broker.desc", label: "Step 6 Broker Description", default: "Spend less time chasing, more time closing.", type: "input", section: "Journey Timeline" },
      { key: "timeline.step6.agency.title", label: "Step 6 Agency Title", default: "Consolidated Tools", type: "input", section: "Journey Timeline" },
      { key: "timeline.step6.agency.desc", label: "Step 6 Agency Description", default: "Replace scattered spreadsheets and apps with one platform.", type: "input", section: "Journey Timeline" },
    ]
  },
  "connect-now": {
    name: "Connect Now Page",
    path: "/connect-now",
    fields: [
      { key: "hero.titlePrefix", label: "Hero Title Prefix", default: "Connect", type: "input", section: "Hero Banner" },
      { key: "hero.titleHighlight", label: "Hero Title Highlight", default: "Now", type: "input", section: "Hero Banner" },
      { key: "hero.description", label: "Hero Description", default: "Let's build the future of brokerage together.", type: "input", section: "Hero Banner" },

      { key: "form.title", label: "Contact Panel Title", default: "Get In Touch", type: "input", section: "Left Contact Details" },
      { key: "form.subtitle", label: "Contact Panel Subtitle", default: "Ready to transform your workflow?", type: "input", section: "Left Contact Details" },
      { key: "form.description", label: "Contact Panel Description", default: "Our team is standing with you and will contact you within 24 business hours.", type: "textarea", section: "Left Contact Details" },
      { key: "form.callUsLabel", label: "Call Label", default: "Call Us", type: "input", section: "Left Contact Details" },
      { key: "form.phone", label: "Contact Phone Number", default: "+91 93114 43034", type: "input", section: "Left Contact Details" },
      { key: "form.emailUsLabel", label: "Email Label", default: "Email Us", type: "input", section: "Left Contact Details" },
      { key: "form.email", label: "Contact Email Address", default: "hello@brokarta.com", type: "input", section: "Left Contact Details" },
      { key: "form.followUsLabel", label: "Follow Us Label", default: "Follow Us", type: "input", section: "Left Contact Details" },

      { key: "form.step1.question", label: "Step 1 Question", default: "Are you a...", type: "input", section: "Inquiry Form Steps" },
      { key: "form.step1.options.broker", label: "Option - Broker", default: "Broker", type: "input", section: "Inquiry Form Steps" },
      { key: "form.step1.options.agency", label: "Option - Agency", default: "Agency", type: "input", section: "Inquiry Form Steps" },
      { key: "form.step1.options.others", label: "Option - Others", default: "Others", type: "input", section: "Inquiry Form Steps" },
      { key: "form.step1.lookingFor", label: "Looking For Question", default: "What are you looking for?", type: "input", section: "Inquiry Form Steps" },
      { key: "form.step1.options.joinAsBroker", label: "Option - Join as Broker", default: "Join as Broker", type: "input", section: "Inquiry Form Steps" },
      { key: "form.step1.options.bookDemo", label: "Option - Book a Demo", default: "Book a Demo", type: "input", section: "Inquiry Form Steps" },
      { key: "form.step1.options.enterprise", label: "Option - Enterprise Use", default: "Enterprise Use", type: "input", section: "Inquiry Form Steps" },
      { key: "form.step1.options.support", label: "Option - Support/Query", default: "Support/Query", type: "input", section: "Inquiry Form Steps" },

      { key: "form.step2.title", label: "Step 2 Section Title", default: "Tell us about yourself", type: "input", section: "Inquiry Form Steps" },
      { key: "form.step2.fullNamePlaceholder", label: "Step 2 Full Name Placeholder", default: "Full Name", type: "input", section: "Inquiry Form Steps" },
      { key: "form.step2.phonePlaceholder", label: "Step 2 Phone Placeholder", default: "Phone Number", type: "input", section: "Inquiry Form Steps" },
      { key: "form.step2.emailPlaceholder", label: "Step 2 Email Placeholder", default: "Email (Optional)", type: "input", section: "Inquiry Form Steps" },

      { key: "form.step3.title", label: "Step 3 Section Title", default: "Company Details", type: "input", section: "Inquiry Form Steps" },
      { key: "form.step3.companyPlaceholder", label: "Step 3 Company Placeholder", default: "Company Name (Optional)", type: "input", section: "Inquiry Form Steps" },
      { key: "form.step3.rolePlaceholder", label: "Step 3 Role Placeholder", default: "Your Role / Designation (Optional)", type: "input", section: "Inquiry Form Steps" },

      { key: "form.step4.title", label: "Step 4 Section Title", default: "How can we help?", type: "input", section: "Inquiry Form Steps" },
      { key: "form.step4.placeholder", label: "Step 4 Message Placeholder", default: "Type your message here...", type: "textarea", section: "Inquiry Form Steps" },

      { key: "form.almostThere", label: "Step 4 Header Banner", default: "Almost there- just one last step!", type: "input", section: "Inquiry Form Steps" },
      { key: "form.successTitle", label: "Success Screen Title", default: "Submitted Successfully!", type: "input", section: "Inquiry Form Steps" },
      { key: "form.successMessage", label: "Success Screen Message", default: "Thank you for reaching out. We have received your details and our team will get in touch with you within 24 business hours.", type: "textarea", section: "Inquiry Form Steps" },
      { key: "form.submitAnother", label: "Submit Another Button", default: "Submit Another Inquiry", type: "input", section: "Inquiry Form Steps" },

      { key: "form.nav.prev", label: "Form Previous Button", default: "Previous", type: "input", section: "Inquiry Form Steps" },
      { key: "form.nav.next", label: "Form Next Button", default: "Next", type: "input", section: "Inquiry Form Steps" },
      { key: "form.nav.submit", label: "Form Submit Button", default: "Submit", type: "input", section: "Inquiry Form Steps" },

      { key: "social.linkedin", label: "LinkedIn Social URL", default: "https://www.linkedin.com/company/brokarta", type: "input", section: "Social & Contact Links" },
      { key: "social.twitter", label: "X / Twitter Social URL", default: "https://twitter.com/brokarta", type: "input", section: "Social & Contact Links" },
    ]
  },
  "privacy-policy": {
    name: "Privacy Policy Page",
    path: "/privacy-policy",
    fields: [
      { key: "backHome", label: "Back Link Text", default: "Back to Home", type: "input", section: "Document Header" },
      { key: "badge", label: "Header Badge", default: "Official Document", type: "input", section: "Document Header" },
      { key: "title", label: "Page Main Title", default: "Privacy Policy", type: "input", section: "Document Header" },
      { key: "subtitle", label: "Page Subtitle", default: "At Brokarta, we are committed to safeguarding your privacy and protecting the data of verified real estate brokers across our ecosystem.", type: "textarea", section: "Document Header" },
      { key: "lastUpdated", label: "Last Updated Label", default: "Last Updated", type: "input", section: "Document Header" },
      { key: "lastUpdatedDate", label: "Last Updated Date", default: "July 2026", type: "input", section: "Document Header" },
      { key: "effectiveDate", label: "Effective Date Label", default: "Effective Date", type: "input", section: "Document Header" },
      { key: "effectiveDateValue", label: "Effective Date Value", default: "Immediate", type: "input", section: "Document Header" },

      { key: "section1.title", label: "Section 1 Title", default: "1. Information We Collect", type: "input", section: "Clause Content" },
      { key: "section1.intro", label: "Section 1 Intro", default: "To maintain an exclusive, verified B2B network for real estate brokers, Brokarta collects personal and professional information necessary to verify identities and enable seamless deal collaboration.", type: "textarea", section: "Clause Content" },

      { key: "section2.title", label: "Section 2 Title", default: "2. How We Use Your Information", type: "input", section: "Clause Content" },
      { key: "section2.intro", label: "Section 2 Intro", default: "We utilize your data strictly to facilitate trusted broker-to-broker connections, ensure community security, and continuously improve platform services:", type: "textarea", section: "Clause Content" },

      { key: "section3.title", label: "Section 3 Title", default: "3. Information Sharing & Protection", type: "input", section: "Clause Content" },
      { key: "section3.intro", label: "Section 3 Intro", default: "Brokarta never sells your personal information to third-party advertisers. Your contact details are shared only with verified brokers on the platform when you explicitly initiate or accept a deal connection or inquiry.", type: "textarea", section: "Clause Content" },

      { key: "section4.title", label: "Section 4 Title", default: "4. Your Rights & Choices", type: "input", section: "Clause Content" },
      { key: "section4.intro", label: "Section 4 Intro", default: "You retain complete ownership over your account data. You may at any time:", type: "textarea", section: "Clause Content" },

      { key: "section5.title", label: "Section 5 Title", default: "5. Contact Us", type: "input", section: "Clause Content" },
      { key: "section5.email", label: "Section 5 Email", default: "privacy@brokarta.com", type: "input", section: "Clause Content" },
    ]
  },
  "terms-of-service": {
    name: "Terms of Service Page",
    path: "/terms-of-service",
    fields: [
      { key: "backHome", label: "Back Link Text", default: "Back to Home", type: "input", section: "Document Header" },
      { key: "badge", label: "Header Badge", default: "Legal Agreement", type: "input", section: "Document Header" },
      { key: "title", label: "Page Main Title", default: "Terms of Service", type: "input", section: "Document Header" },
      { key: "subtitle", label: "Page Subtitle", default: "Please review these Terms of Service carefully before accessing or using the Brokarta broker platform and mobile application.", type: "textarea", section: "Document Header" },
      { key: "lastUpdated", label: "Last Updated Label", default: "Last Updated", type: "input", section: "Document Header" },
      { key: "lastUpdatedDate", label: "Last Updated Date", default: "July 2026", type: "input", section: "Document Header" },
      { key: "version", label: "Version Label", default: "Version", type: "input", section: "Document Header" },
      { key: "versionValue", label: "Version Value", default: "v2.4", type: "input", section: "Document Header" },

      { key: "section1.title", label: "Section 1 Title", default: "1. Acceptance of Terms & Eligibility", type: "input", section: "Clause Content" },
      { key: "section1.intro", label: "Section 1 Intro", default: "By registering an account or accessing the Brokarta application, you represent and warrant that you are a licensed real estate broker or authorized industry professional in good standing with relevant regulatory authorities.", type: "textarea", section: "Clause Content" },

      { key: "section2.title", label: "Section 2 Title", default: "2. User Conduct & Professional Ethics", type: "input", section: "Clause Content" },
      { key: "section2.intro", label: "Section 2 Intro", default: "Brokarta is a high-trust professional network. Members agree to uphold strict real estate code of ethics when engaging with fellow brokers:", type: "textarea", section: "Clause Content" },

      { key: "section3.title", label: "Section 3 Title", default: "3. Listings & Commission Disclaimers", type: "input", section: "Clause Content" },
      { key: "section3.intro", label: "Section 3 Intro", default: "Brokarta serves as a technology enablement platform connecting brokers. Brokarta does not act as a real estate brokerage, property owner, or escrow agent in any transaction.", type: "textarea", section: "Clause Content" },

      { key: "section4.title", label: "Section 4 Title", default: "4. Termination & Account Cancellation", type: "input", section: "Clause Content" },
      { key: "section4.email", label: "Support Contact Email", default: "support@brokarta.com", type: "input", section: "Clause Content" },
    ]
  },
  "cookie-policy": {
    name: "Cookie Policy Page",
    path: "/cookie-policy",
    fields: [
      { key: "backHome", label: "Back Link Text", default: "Back to Home", type: "input", section: "Document Header" },
      { key: "badge", label: "Header Badge", default: "Cookies & Tracking", type: "input", section: "Document Header" },
      { key: "title", label: "Page Main Title", default: "Cookie Policy", type: "input", section: "Document Header" },
      { key: "subtitle", label: "Page Subtitle", default: "Learn how Brokarta uses cookies and similar technologies to ensure smooth authentication, platform security, and personalized broker features.", type: "textarea", section: "Document Header" },
      { key: "lastUpdated", label: "Last Updated Label", default: "Last Updated", type: "input", section: "Document Header" },
      { key: "lastUpdatedDate", label: "Last Updated Date", default: "July 2026", type: "input", section: "Document Header" },

      { key: "section1.title", label: "Section 1 Title", default: "1. What Are Cookies?", type: "input", section: "Clause Content" },
      { key: "section1.content", label: "Section 1 Content", default: "Cookies are small text files stored on your browser or mobile device when you visit websites or mobile applications. They allow the platform to recognize your session, remember your preferences, and maintain secure authentication while navigating Brokarta.", type: "textarea", section: "Clause Content" },

      { key: "section2.title", label: "Section 2 Title", default: "2. Types of Cookies We Use", type: "input", section: "Clause Content" },
      { key: "section2.essential.title", label: "Essential Cookies Title", default: "Essential & Security Cookies", type: "input", section: "Clause Content" },
      { key: "section2.essential.content", label: "Essential Cookies Description", default: "Required for core platform functionality, user login session persistence, CSRF protection, and identity verification.", type: "textarea", section: "Clause Content" },

      { key: "section3.title", label: "Section 3 Title", default: "3. Managing Your Cookie Preferences", type: "input", section: "Clause Content" },
      { key: "section3.content", label: "Section 3 Description", default: "You can adjust or disable non-essential cookies at any time through your web browser settings. Please note that disabling essential cookies may impact your ability to log in or access secure broker-only listing portals.", type: "textarea", section: "Clause Content" },
    ]
  },
  layout: {
    name: "Global Footer & Navigation",
    path: "/",
    fields: [
      { key: "footer.company.title", label: "Footer Company Header", default: "Company", type: "input", section: "Footer Navigation Links" },
      { key: "footer.company.about", label: "Footer Link - About Us", default: "About Us", type: "input", section: "Footer Navigation Links" },
      { key: "footer.company.whatWeOffer", label: "Footer Link - What We Offer", default: "What We Offer", type: "input", section: "Footer Navigation Links" },
      { key: "footer.company.becomeUser", label: "Footer Link - Become A User", default: "Become A User", type: "input", section: "Footer Navigation Links" },
      { key: "footer.company.connectNow", label: "Footer Link - Connect Now", default: "Connect Now", type: "input", section: "Footer Navigation Links" },

      { key: "footer.legal.title", label: "Footer Legal Header", default: "Legal", type: "input", section: "Footer Navigation Links" },
      { key: "footer.legal.privacy", label: "Footer Link - Privacy Policy", default: "Privacy Policy", type: "input", section: "Footer Navigation Links" },
      { key: "footer.legal.terms", label: "Footer Link - Terms of Service", default: "Terms of Service", type: "input", section: "Footer Navigation Links" },
      { key: "footer.legal.cookie", label: "Footer Link - Cookie Policy", default: "Cookie Policy", type: "input", section: "Footer Navigation Links" },

      { key: "footer.cta.prefix", label: "Footer Callout Line 1 Prefix", default: "READY TO", type: "input", section: "Footer CTA Banner" },
      { key: "footer.cta.highlight1", label: "Footer Callout Line 1 Highlight", default: "NETWORK", type: "input", section: "Footer CTA Banner" },
      { key: "footer.cta.middle", label: "Footer Callout Line 2 Prefix", default: "AND", type: "input", section: "Footer CTA Banner" },
      { key: "footer.cta.highlight2", label: "Footer Callout Line 2 Highlight", default: "GROW?", type: "input", section: "Footer CTA Banner" },
      { key: "footer.cta.subtitle", label: "Footer Callout Subtitle", default: "Join the only verified digital ecosystem built exclusively for real estate brokers.", type: "textarea", section: "Footer CTA Banner" },

      { key: "footer.appStore.downloadOn", label: "Footer AppStore Download Label", default: "Download on", type: "input", section: "Footer CTA Banner" },
      { key: "footer.appStore.text", label: "Footer AppStore Title", default: "App Store", type: "input", section: "Footer CTA Banner" },
      { key: "footer.googlePlay.getItOn", label: "Footer GooglePlay Download Label", default: "Get it on", type: "input", section: "Footer CTA Banner" },
      { key: "footer.googlePlay.text", label: "Footer GooglePlay Title", default: "Google Play", type: "input", section: "Footer CTA Banner" },

      { key: "drawer.menu.about", label: "Mobile Drawer - About Us", default: "About Us", type: "input", section: "Mobile Navigation Drawer" },
      { key: "drawer.menu.whatWeOffer", label: "Mobile Drawer - What We Offer", default: "What We Offer", type: "input", section: "Mobile Navigation Drawer" },
      { key: "drawer.menu.becomeUser", label: "Mobile Drawer - Become A User", default: "Become A User", type: "input", section: "Mobile Navigation Drawer" },
      { key: "drawer.menu.connectNow", label: "Mobile Drawer - Connect Now", default: "Connect Now", type: "input", section: "Mobile Navigation Drawer" },
      { key: "drawer.inquiriesLabel", label: "Mobile Drawer Inquiries Label", default: "Direct Inquiries", type: "input", section: "Mobile Navigation Drawer" },
      { key: "drawer.email", label: "Mobile Drawer Direct Email", default: "hello@brokarta.com", type: "input", section: "Mobile Navigation Drawer" },

      { key: "social.linkedin", label: "LinkedIn Social URL", default: "https://linkedin.com/company/brokarta", type: "input", section: "Social & Contact Links" },
      { key: "social.twitter", label: "X / Twitter Social URL", default: "https://x.com/brokarta", type: "input", section: "Social & Contact Links" },
      { key: "social.instagram", label: "Instagram Social URL", default: "https://instagram.com/brokarta", type: "input", section: "Social & Contact Links" },
      { key: "social.investorEmail", label: "Investor Contact Email", default: "invest@brokarta.com", type: "input", section: "Social & Contact Links" },
      { key: "footer.copyright", label: "Footer Copyright Line", default: "© 2026 Brokarta. All rights reserved.", type: "input", section: "Social & Contact Links" },
      { key: "footer.madeWithLove", label: "Footer Tagline Line", default: "Made with love for the Broker Community", type: "input", section: "Social & Contact Links" },
    ]
  }
};
