import type { Payload } from 'payload'
import { upsertBySlug } from '@saidatech/cms-core/seed'

export async function seedHome(payload: Payload): Promise<void> {
  // Fetch blog post IDs for BlogTeaserBlock (blog must be seeded first)
  const blogResult = await payload.find({
    collection: 'blog',
    where: { active: { equals: true } },
    sort: '-publishedAt',
    limit: 3,
  })
  const blogIds = blogResult.docs.map((d) => d.id as string)

  await upsertBySlug(payload, 'pages', 'home', {
    title: { en: 'Home', ja: 'ホーム', bn: 'হোম' },
    status: 'published',
    layout: [
      // ── 1. Hero ──────────────────────────────────────────────────────────
      {
        blockType: 'hero',
        eyebrow: { en: 'Saidatech', ja: 'サイダテック', bn: 'সাইদাটেক' },
        headline: {
          en: 'Study and Work\nNavigating to connect Human Resources',
          ja: '学び、働く\n人と企業をつなぐ架け橋',
          bn: 'অধ্যয়ন এবং কাজ\nমানব সম্পদ সংযোগের পথপ্রদর্শক',
        },
        subheadline: {
          en: 'Saidatech bridges skilled professionals from Bangladesh and beyond with trusted Japanese employers. Visa guidance, job matching, and bilingual support — every step of the way.',
          ja: 'バングラデシュをはじめとする優秀な人材と日本の信頼できる企業をつなぎます。ビザ手続き、求人マッチング、バイリンガルサポートを一貫して提供。',
          bn: 'সাইদাটেক বাংলাদেশ ও অন্যান্য দেশের দক্ষ পেশাদারদের জাপানের বিশ্বস্ত নিয়োগকর্তাদের সাথে সংযুক্ত করে। ভিসা সহায়তা, চাকরি ম্যাচিং এবং দ্বিভাষিক সমর্থন — প্রতিটি পদক্ষেপে।',
        },
        primaryCta: {
          label: { en: 'Get Started', ja: 'お問い合わせ', bn: 'শুরু করুন' },
          href: '/contact',
        },
        secondaryCta: {
          label: { en: 'Browse Jobs', ja: '求人を見る', bn: 'চাকরি দেখুন' },
          href: '/jobs',
        },
        inlineStats: [
          { value: { en: '5,000+', ja: '5,000社以上', bn: '৫,০০০+' }, label: { en: 'Clients Served', ja: '支援実績', bn: 'সেবিত গ্রাহক' } },
          { value: { en: '100%', ja: '100%', bn: '১০০%' }, label: { en: 'Permit Granted', ja: '許可取得率', bn: 'অনুমতি প্রদান' } },
          { value: { en: '24/7', ja: '24時間', bn: '২৪/৭' }, label: { en: 'Support', ja: 'サポート体制', bn: 'সহায়তা' } },
        ],
        keywordPills: [
          { text: { en: 'Human Resources', ja: '人材紹介', bn: 'মানব সম্পদ' } },
          { text: { en: 'Study Permit', ja: '就学許可', bn: 'স্টাডি পারমিট' } },
          { text: { en: 'Work in Japan', ja: '日本就労', bn: 'জাপানে কাজ' } },
          { text: { en: 'SSW Visa', ja: '特定技能', bn: 'এসএসডাব্লিউ ভিসা' } },
          { text: { en: 'Job Matching', ja: '求人マッチング', bn: 'চাকরি ম্যাচিং' } },
          { text: { en: 'Language Training', ja: '語学研修', bn: 'ভাষা প্রশিক্ষণ' } },
          { text: { en: 'Visa Support', ja: 'ビザサポート', bn: 'ভিসা সহায়তা' } },
          { text: { en: 'Global Careers', ja: 'グローバル就職', bn: 'গ্লোবাল ক্যারিয়ার' } },
        ],
        showScrollIndicator: true,
      },

      // ── 2. Logo Cloud ────────────────────────────────────────────────────
      {
        blockType: 'logo-cloud',
        eyebrow: { en: 'Partners & Certifications', ja: 'パートナー・認定機関', bn: 'অংশীদার ও সনদপত্র' },
        logos: [
          { name: { en: 'Automotive Partner', ja: '自動車メーカー', bn: 'অটোমোটিভ অংশীদার' }, caption: { en: 'Automotive', ja: '自動車', bn: 'অটোমোটিভ' } },
          { name: { en: 'Electronics Corp', ja: '電子機器企業', bn: 'ইলেকট্রনিক্স কর্পোরেশন' }, caption: { en: 'Electronics', ja: '電子機器', bn: 'ইলেকট্রনিক্স' } },
          { name: { en: 'Precision Equipment', ja: '精密機器', bn: 'প্রিসিশন ইকুইপমেন্ট' }, caption: { en: 'Precision', ja: '精密', bn: 'প্রিসিশন' } },
          { name: { en: 'Auto Parts Maker', ja: '自動車部品', bn: 'অটো পার্টস মেকার' }, caption: { en: 'Auto Parts', ja: '部品', bn: 'অটো পার্টস' } },
          { name: { en: 'Manufacturing Group', ja: '製造グループ', bn: 'ম্যানুফ্যাকচারিং গ্রুপ' }, caption: { en: 'Manufacturing', ja: '製造', bn: 'উৎপাদন' } },
          { name: { en: 'Logistics Partner', ja: '物流パートナー', bn: 'লজিস্টিক্স অংশীদার' }, caption: { en: 'Logistics', ja: '物流', bn: 'লজিস্টিক্স' } },
          { name: { en: 'Tech Solutions', ja: 'テックソリューション', bn: 'টেক সমাধান' }, caption: { en: 'Technology', ja: 'テクノロジー', bn: 'প্রযুক্তি' } },
          { name: { en: 'Food Processing', ja: '食品加工', bn: 'ফুড প্রসেসিং' }, caption: { en: 'Food Industry', ja: '食品', bn: 'খাদ্য শিল্প' } },
        ],
        scrollSpeed: 'medium',
      },

      // ── 3. Stats ─────────────────────────────────────────────────────────
      {
        blockType: 'stats',
        eyebrow: { en: 'Why Clients Choose Saidatech', ja: '選ばれる理由', bn: 'কেন সাইদাটেক বেছে নেন' },
        sectionHeading: { en: 'Trusted by industry leaders across Japan', ja: '日本全国の企業から信頼される実績', bn: 'জাপান জুড়ে শিল্প নেতাদের বিশ্বাস' },
        items: [
          { value: 5000, suffix: '+', label: { en: 'Clients Served', ja: '支援実績', bn: 'সেবিত গ্রাহক' } },
          { value: 250, suffix: '+', label: { en: 'Partner Companies', ja: '提携企業', bn: 'অংশীদার কোম্পানি' } },
          { value: 100, suffix: '%', label: { en: 'Permit Granted', ja: '許可取得率', bn: 'অনুমতি প্রদান' } },
          { value: 17, suffix: '+', label: { en: 'Years Experience', ja: '年の実績', bn: 'বছরের অভিজ্ঞতা' } },
        ],
      },

      // ── 4. Bento Grid ────────────────────────────────────────────────────
      {
        blockType: 'bento-grid',
        eyebrow: { en: 'Why Saidatech', ja: 'サイダテックが選ばれる理由', bn: 'কেন সাইদাটেক' },
        heading: { en: '5 Reasons Clients Choose Us', ja: '5つの選ばれる理由', bn: 'আমাদের বেছে নেওয়ার ৫টি কারণ' },
        intro: {
          en: 'From your first inquiry to your first payslip in Japan, Saidatech handles every detail so you can focus on building your career.',
          ja: '最初のお問い合わせから日本での最初の給与明細まで、すべての手続きをサイダテックが責任を持ってサポートします。',
          bn: 'আপনার প্রথম অনুসন্ধান থেকে জাপানে প্রথম বেতন পাওয়া পর্যন্ত, সাইদাটেক প্রতিটি বিবরণ পরিচালনা করে।',
        },
        layout: 'asymmetric',
        items: [
          {
            number: '01',
            title: { en: 'Verified Japanese Employer Network', ja: '審査済みの日本企業ネットワーク', bn: 'যাচাইকৃত জাপানি নিয়োগকর্তা নেটওয়ার্ক' },
            description: { en: 'Every partner company is individually vetted for compliance, workplace culture, and pay standards — so you only connect with employers worth working for.', ja: '全提携企業はコンプライアンス・職場環境・給与水準を個別審査済み。信頼できる企業のみをご紹介します。', bn: 'প্রতিটি অংশীদার কোম্পানি আনুগত্য, কর্মক্ষেত্র সংস্কৃতি এবং বেতন মানদণ্ডের জন্য পৃথকভাবে যাচাই করা হয়।' },
          },
          {
            number: '02',
            title: { en: 'End-to-End Visa & Compliance Support', ja: 'ビザ・法令対応のワンストップサポート', bn: 'সম্পূর্ণ ভিসা ও কমপ্লায়েন্স সহায়তা' },
            description: { en: 'We handle all visa categories — SSW, TITP, student, and dependent — along with residence card renewals and regulatory filings.', ja: '特定技能・技能実習・留学・家族滞在など全ビザ種別に対応。在留カード更新や各種届出も代行します。', bn: 'এসএসডাব্লিউ, টিআইটিপি, ছাত্র এবং নির্ভরশীল সহ সমস্ত ভিসা বিভাগ পরিচালনা করি।' },
          },
          {
            number: '03',
            title: { en: 'Bilingual Onboarding & Aftercare', ja: 'バイリンガル入社・アフターケア', bn: 'দ্বিভাষিক অনবোর্ডিং ও আফটারকেয়ার' },
            description: { en: 'Our bilingual coordinators guide you through day-one orientation, housing setup, and ongoing check-ins for the first year.', ja: '初日のオリエンテーション、住居手配から入社後1年間の定期フォローまで、バイリンガルコーディネーターが伴走します。', bn: 'আমাদের দ্বিভাষিক সমন্বয়কারীরা প্রথম দিনের ওরিয়েন্টেশন, আবাসন সেটআপ এবং প্রথম বছরের চেক-ইন পরিচালনা করেন।' },
          },
          {
            number: '04',
            title: { en: 'Industry-Specific Training Programs', ja: '業種別研修プログラム', bn: 'শিল্প-নির্দিষ্ট প্রশিক্ষণ কার্যক্রম' },
            description: { en: 'Sector-tailored pre-departure training in manufacturing, food processing, construction, and care work prepares candidates before they arrive.', ja: '製造・食品・建設・介護など業種別の出国前研修で、即戦力として活躍できる人材を育成します。', bn: 'উৎপাদন, খাদ্য প্রক্রিয়াকরণ, নির্মাণ এবং যত্ন কাজে সেক্টর-অনুযায়ী প্রস্থান-পূর্ব প্রশিক্ষণ।' },
          },
          {
            number: '05',
            title: { en: 'Transparent Fees & Reporting', ja: '明朗会計と定期レポート', bn: 'স্বচ্ছ ফি ও রিপোর্টিং' },
            description: { en: 'No hidden costs. Candidates and employers both receive clear fee schedules, placement reports, and retention metrics.', ja: '隠れコスト一切なし。求職者と企業の双方に、明確な費用一覧・採用レポート・定着率データを提供します。', bn: 'কোনো লুকানো খরচ নেই। প্রার্থী এবং নিয়োগকর্তা উভয়ই স্পষ্ট ফি সময়সূচি এবং ধারণ মেট্রিক্স পান।' },
          },
        ],
      },

      // ── 5. Services Grid ─────────────────────────────────────────────────
      {
        blockType: 'services-grid',
        eyebrow: { en: 'HR Services', ja: '人材サービス', bn: 'এইচআর সেবা' },
        heading: { en: 'Our Comprehensive HR Services', ja: '人材に関する包括的なサービス', bn: 'আমাদের ব্যাপক এইচআর সেবাসমূহ' },
        layout: 'alternating',
        services: [
          {
            title: { en: 'Student Visa Assistance', ja: '留学ビザサポート', bn: 'ছাত্র ভিসা সহায়তা' },
            subheadline: { en: 'Study in Japan', ja: '日本で学ぶ', bn: 'জাপানে পড়াশোনা' },
            description: { en: 'We guide students through every stage of the Japanese student visa process — from document preparation and language school enrollment to landing at your new institution.', ja: '書類準備・語学学校選び・入学手続きから入国まで、留学ビザ取得の全プロセスを丁寧にサポートします。', bn: 'নথি প্রস্তুতি থেকে ভাষা বিদ্যালয়ে ভর্তি পর্যন্ত জাপানী ছাত্র ভিসা প্রক্রিয়ার প্রতিটি ধাপে আমরা গাইড করি।' },
            cta: { label: { en: 'Learn more', ja: '詳しく見る', bn: 'আরও জানুন' }, href: '/services/student-visa' },
          },
          {
            title: { en: 'SSW & Technical Internship Support', ja: '特定技能・技能実習サポート', bn: 'এসএসডাব্লিউ ও টেকনিক্যাল ইন্টার্নশিপ সহায়তা' },
            subheadline: { en: 'Work-based pathways', ja: '就労在留資格', bn: 'কর্ম-ভিত্তিক পথ' },
            description: { en: 'From JLPT preparation and skills testing to employer matching and inbound logistics, our team handles SSW and TITP registrations end-to-end.', ja: 'JLPT対策・技能試験から企業マッチング・入国手続きまで、特定技能・技能実習の申請を一括サポートします。', bn: 'JLPT প্রস্তুতি ও দক্ষতা পরীক্ষা থেকে নিয়োগকর্তা ম্যাচিং পর্যন্ত, আমাদের দল এসএসডাব্লিউ এবং টিআইটিপি নিবন্ধন পরিচালনা করে।' },
            cta: { label: { en: 'Learn more', ja: '詳しく見る', bn: 'আরও জানুন' }, href: '/services/ssw-titp' },
          },
          {
            title: { en: 'Employment & Job Matching', ja: '求人マッチング', bn: 'কর্মসংস্থান ও চাকরি ম্যাচিং' },
            subheadline: { en: 'Find the right fit', ja: '最適なマッチング', bn: 'সঠিক ম্যাচ খুঁজুন' },
            description: { en: 'Our curated job board and dedicated placement coordinators match your skills and career goals with verified openings at Japanese companies across multiple industries.', ja: '厳選された求人情報と専任のコーディネーターが、あなたのスキルとキャリア目標に合った日本企業の求人をご紹介します。', bn: 'আমাদের বাছাই করা চাকরির তালিকা এবং নিবেদিত প্লেসমেন্ট সমন্বয়কারীরা আপনার দক্ষতা এবং ক্যারিয়ার লক্ষ্যের সাথে মিলিয়ে দেয়।' },
            cta: { label: { en: 'Browse jobs', ja: '求人を見る', bn: 'চাকরি দেখুন' }, href: '/jobs' },
          },
          {
            title: { en: 'Visa Processing & Consultation', ja: 'ビザ申請・相談', bn: 'ভিসা প্রক্রিয়াকরণ ও পরামর্শ' },
            subheadline: { en: 'Stay compliant', ja: '在留資格管理', bn: 'কমপ্লায়েন্ট থাকুন' },
            description: { en: 'Our certified immigration specialists handle application filing, status-of-residence changes, renewals, and appeals — so your legal status is always in order.', ja: '認定入国管理スペシャリストが、在留資格申請・変更・更新・不服申立てまで対応。常に適法な状態を保ちます。', bn: 'আমাদের প্রত্যয়িত ইমিগ্রেশন বিশেষজ্ঞরা আবেদন দাখিল, বাসস্থানের মর্যাদা পরিবর্তন, নবায়ন এবং আপিল পরিচালনা করেন।' },
            cta: { label: { en: 'Learn more', ja: '詳しく見る', bn: 'আরও জানুন' }, href: '/services/visa' },
          },
          {
            title: { en: 'Japanese Language & Cultural Training', ja: '日本語・文化研修', bn: 'জাপানি ভাষা ও সাংস্কৃতিক প্রশিক্ষণ' },
            subheadline: { en: 'Prepare before you arrive', ja: '渡航前準備', bn: 'আসার আগে প্রস্তুত হন' },
            description: { en: 'Our structured pre-departure curriculum covers N5–N3 Japanese, workplace etiquette, daily-life navigation, and sector-specific vocabulary to hit the ground running.', ja: 'N5〜N3の日本語・ビジネスマナー・日常生活・業種別用語を体系的に学ぶ出国前カリキュラムで、即戦力としてスタートできます。', bn: 'আমাদের কাঠামোগত প্রি-ডিপার্চার কারিকুলামে N5-N3 জাপানি, কর্মক্ষেত্র শিষ্টাচার এবং সেক্টর-নির্দিষ্ট শব্দভাণ্ডার অন্তর্ভুক্ত।' },
            cta: { label: { en: 'Learn more', ja: '詳しく見る', bn: 'আরও জানুন' }, href: '/services/language-training' },
          },
        ],
      },

      // ── 6. Case Studies ──────────────────────────────────────────────────
      {
        blockType: 'case-studies-grid',
        source: 'inline',
        eyebrow: { en: 'Case Studies', ja: '事例紹介', bn: 'কেস স্টাডি' },
        heading: { en: 'Client Success Stories', ja: 'お客様の成功事例', bn: 'ক্লায়েন্টের সাফল্যের গল্প' },
        challengeLabel: { en: 'Challenge', ja: '課題', bn: 'চ্যালেঞ্জ' },
        solutionLabel: { en: 'Solution', ja: '解決策', bn: 'সমাধান' },
        layout: 'stacked',
        inlineStudies: [
          {
            name: { en: 'Sarah Tabassum', ja: 'サラ・タバッスム', bn: 'সারাহ তাবাস্সুম' },
            role: { en: 'Japanese Language Student', ja: '日本語学習生', bn: 'জাপানি ভাষার শিক্ষার্থী' },
            metric: {
              value: { en: '100%', ja: '100%', bn: '১০০%' },
              caption: { en: 'Fluency and confidence achieved', ja: '流暢さと自信を習得', bn: 'সাবলীলতা ও আত্মবিশ্বাস অর্জিত' },
            },
            challenge: {
              en: 'Sarah had zero Japanese when she enrolled. She needed to pass a language proficiency test within eight months to qualify for the work placement pathway she had set her sights on.',
              ja: '入学時の日本語力はゼロ。目標とする就労ルートに必要な語学検定に8ヶ月以内に合格しなければなりませんでした。',
              bn: 'ভর্তির সময় সারাহের জাপানি ভাষা জ্ঞান ছিল শূন্য। তাকে আট মাসের মধ্যে ভাষা দক্ষতা পরীক্ষায় উত্তীর্ণ হতে হতো।',
            },
            solution: {
              en: 'Saidatech enrolled Sarah in its intensive pre-departure programme with weekly one-to-one coaching. She passed JLPT N4 in month seven and is now progressing toward N3 while working in Nagoya.',
              ja: 'サイダテックの出国前集中プログラムに入学し、毎週の個別コーチングを受講。7ヶ月目にJLPT N4に合格し、現在は名古屋で就労しながらN3取得を目指しています。',
              bn: 'সাইদাটেক তাকে সাপ্তাহিক ওয়ান-টু-ওয়ান কোচিং সহ তার নিবিড় প্রি-ডিপার্চার প্রোগ্রামে ভর্তি করে। সাত মাসে JLPT N4 পাস করে এখন নাগোয়ায় কাজ করছেন।',
            },
          },
          {
            name: { en: 'Ahmed Shubo', ja: 'アハメド・シュボ', bn: 'আহমেদ শুভ' },
            role: { en: 'Manufacturing Engineer, Aichi Prefecture', ja: '製造エンジニア（愛知県）', bn: 'ম্যানুফ্যাকচারিং ইঞ্জিনিয়ার, আইচি প্রিফেকচার' },
            metric: {
              value: { en: '1st', ja: '1社目', bn: '১ম' },
              caption: { en: 'Offer received from first matched employer', ja: '最初にマッチした企業から内定を獲得', bn: 'প্রথম ম্যাচড নিয়োগকর্তার কাছ থেকে অফার' },
            },
            challenge: {
              en: 'Ahmed is a mechanical engineer who had never lived in Japan. He needed an employer willing to sponsor his SSW visa without prior in-country work history — a notoriously difficult combination.',
              ja: 'アハメドは日本での在住経験のない機械エンジニア。在日就労歴なしで特定技能ビザのスポンサーになる企業を探す必要があり、これは非常に難しい状況でした。',
              bn: 'আহমেদ একজন মেকানিক্যাল ইঞ্জিনিয়ার যিনি জাপানে কখনো থাকেননি। তার দেশে কাজের ইতিহাস ছাড়াই এসএসডাব্লিউ ভিসা স্পনসর করতে ইচ্ছুক নিয়োগকর্তা দরকার ছিল।',
            },
            solution: {
              en: "Saidatech's employer network includes manufacturers actively seeking overseas engineers. Within 30 days of registration, Ahmed was matched and received an offer from his first interview — relocating to Aichi within the quarter.",
              ja: 'サイダテックの提携企業ネットワークには、海外エンジニアを積極採用する製造業者が含まれています。登録から30日以内にマッチングが成立し、初回面接で内定を獲得。四半期内に愛知へ転居しました。',
              bn: 'সাইদাটেকের নিয়োগকর্তা নেটওয়ার্কে এমন উৎপাদনকারীরা রয়েছেন যারা সক্রিয়ভাবে বিদেশী প্রকৌশলী খুঁজছেন। নিবন্ধনের ৩০ দিনের মধ্যে ম্যাচিং হয়ে প্রথম সাক্ষাৎকারেই অফার পান।',
            },
          },
          {
            name: { en: 'Mahmud Karim', ja: 'マハムド・カリム', bn: 'মাহমুদ করিম' },
            role: { en: 'Student, Nagoya Language Institute', ja: '学生（名古屋語学院）', bn: 'শিক্ষার্থী, নাগোয়া ল্যাঙ্গুয়েজ ইন্সটিটিউট' },
            metric: {
              value: { en: '100%', ja: '100%', bn: '১০০%' },
              caption: { en: 'Enrollment documents processed on time', ja: '入学書類の期限内処理率', bn: 'সময়মতো ভর্তির নথি প্রক্রিয়া সম্পন্ন' },
            },
            challenge: {
              en: "Mahmud's student visa application had previously been rejected at another agency due to incomplete documentation. He was facing a second attempt with a tightening enrollment deadline.",
              ja: '以前の他エージェントによるビザ申請が書類不備で却下されており、入学締め切りが迫る中での2回目の申請となりました。',
              bn: 'মাহমুদের ছাত্র ভিসার আবেদন আগে অন্য একটি এজেন্সিতে অসম্পূর্ণ নথির কারণে প্রত্যাখ্যাত হয়েছিল। তিনি ভর্তির সময়সীমা সংকুচিত হওয়ার মধ্যে দ্বিতীয় চেষ্টার মুখোমুখি হচ্ছিলেন।',
            },
            solution: {
              en: "Saidatech's visa team conducted a full document audit, corrected the four missing items from the prior application, and submitted within the deadline. Mahmud's visa was approved on the first application — zero rejections.",
              ja: 'サイダテックのビザ担当チームが書類を完全監査し、前回申請の4つの不備を修正して期限内に提出。ビザは初回申請で承認され、却下はゼロでした。',
              bn: 'সাইদাটেকের ভিসা টিম একটি সম্পূর্ণ নথি নিরীক্ষা পরিচালনা করে, আগের আবেদনের চারটি অনুপস্থিত আইটেম সংশোধন করে সময়সীমার মধ্যে জমা দেয়।',
            },
          },
          {
            name: { en: 'Kenji Sato', ja: 'ケンジ・サトウ', bn: 'কেনজি সাতো' },
            role: { en: 'Operations Manager, Aichi Manufacturing', ja: 'オペレーションマネージャー（愛知製造業）', bn: 'অপারেশন ম্যানেজার, আইচি ম্যানুফ্যাকচারিং' },
            metric: {
              value: { en: '14 Days', ja: '14日', bn: '১৪ দিন' },
              caption: { en: 'From workforce request to on-site deployment', ja: '人員要請から現場配置まで', bn: 'কর্মী অনুরোধ থেকে সাইটে মোতায়েন পর্যন্ত' },
            },
            challenge: {
              en: "Kenji's factory secured an unexpected large order in Q1 and needed 12 additional production-line workers within three weeks — far faster than standard hiring timelines allow.",
              ja: 'ケンジの工場がQ1に予期せぬ大型受注を獲得し、通常の採用スケジュールをはるかに超える3週間以内に生産ラインスタッフ12名が必要となりました。',
              bn: 'কেনজির কারখানা Q1-এ একটি অপ্রত্যাশিত বড় অর্ডার পায় এবং তিন সপ্তাহের মধ্যে ১২ জন অতিরিক্ত উৎপাদন-লাইন কর্মী দরকার ছিল।',
            },
            solution: {
              en: 'Saidatech activated its registered dispatch pool, ran compliance checks overnight, and deployed 12 qualified workers to the factory floor in 14 days — keeping the production schedule intact.',
              ja: 'サイダテックは登録済み派遣プールを稼働させ、一夜でコンプライアンス審査を完了。14日以内に12名の適格スタッフを工場に配置し、生産スケジュールを守りました。',
              bn: 'সাইদাটেক তার নিবন্ধিত ডিসপ্যাচ পুল সক্রিয় করে, রাতারাতি কমপ্লায়েন্স চেক চালায় এবং ১৪ দিনে ১২ জন যোগ্য কর্মী কারখানায় মোতায়েন করে।',
            },
          },
          {
            name: { en: 'Yuka Tanaka', ja: 'ユカ・タナカ', bn: 'ইউকা তানাকা' },
            role: { en: 'HR Director, Technology Services Company', ja: 'HRディレクター（テクノロジーサービス企業）', bn: 'এইচআর ডিরেক্টর, টেকনোলজি সার্ভিসেস কোম্পানি' },
            metric: {
              value: { en: '98%', ja: '98%', bn: '৯৮%' },
              caption: { en: 'Visa compliance rate across all dispatched staff', ja: '全派遣スタッフのビザ適法率', bn: 'সকল ডিসপ্যাচ কর্মীর ভিসা কমপ্লায়েন্স হার' },
            },
            challenge: {
              en: "Yuka's company had grown rapidly and was managing visa renewals for 80+ foreign workers across four visa categories. Internal tracking was done via spreadsheet and she had narrowly avoided three lapsed permits.",
              ja: 'ユカの会社は急成長し、4種類のビザカテゴリーにわたる外国人スタッフ80名以上のビザ更新管理をスプレッドシートで行っていました。更新漏れを3度ギリギリで回避した状況でした。',
              bn: 'ইউকার কোম্পানি দ্রুত বৃদ্ধি পেয়েছিল এবং চারটি ভিসা বিভাগে ৮০+ বিদেশী কর্মীর ভিসা নবায়ন স্প্রেডশিটে ট্র্যাক করছিল।',
            },
            solution: {
              en: "Saidatech's managed compliance service took over all tracking, renewal filings, and status-change notifications. Over the following 12 months, the compliance rate across all dispatched staff reached 98% — with zero lapses.",
              ja: 'サイダテックのコンプライアンス管理サービスがすべての追跡・更新届出・在留資格変更通知を引き継ぎました。その後12ヶ月間、全派遣スタッフのビザ適法率は98%を達成、更新漏れはゼロでした。',
              bn: 'সাইদাটেকের পরিচালিত কমপ্লায়েন্স সার্ভিস সমস্ত ট্র্যাকিং, নবায়ন ফাইলিং এবং স্ট্যাটাস-পরিবর্তন বিজ্ঞপ্তি গ্রহণ করে। পরের ১২ মাসে কমপ্লায়েন্স হার ৯৮%-এ পৌঁছায়।',
            },
          },
        ],
      },

      // ── 7. Company Profile ───────────────────────────────────────────────
      {
        blockType: 'company-profile',
        source: 'inline',
        eyebrow: { en: 'About Us', ja: '会社概要', bn: 'আমাদের সম্পর্কে' },
        heading: { en: 'Company Profile', ja: '企業情報', bn: 'কোম্পানি প্রোফাইল' },
        inlineProfile: {
          companyName: { en: 'Saidatech Co., Ltd.', ja: 'サイダテック株式会社', bn: 'সাইদাটেক কো., লিমিটেড' },
          founded: { en: 'April 2009', ja: '2009年4月', bn: 'এপ্রিল ২০০৯' },
          ceo: { en: 'Representative Director', ja: '代表取締役', bn: 'প্রতিনিধি পরিচালক' },
          address: {
            en: '1-2-3 Nakamura-ku, Nagoya City, Aichi Prefecture, Japan',
            ja: '〒450-XXXX 愛知県名古屋市中村区○○○1-2-3',
            bn: '১-২-৩ নাকামুরা-কু, নাগোয়া সিটি, আইচি প্রিফেকচার, জাপান',
          },
          capital: { en: '¥30,000,000', ja: '3,000万円', bn: '৩ কোটি ইয়েন' },
          licenseNumber: {
            en: 'Aichi Labour Bureau No. XX-XXXXXX',
            ja: '愛知労働局許可番号 第XX-XXXXXXX号',
            bn: 'আইচি লেবার ব্যুরো নং XX-XXXXXX',
          },
          headcount: {
            en: '150 employees / 5,000+ registered staff',
            ja: '社員150名 / 登録スタッフ5,000名以上',
            bn: '১৫০ কর্মী / ৫,০০০+ নিবন্ধিত স্টাফ',
          },
          businessDescription: {
            en: 'Labour dispatch, employment placement, Japanese language training, and international HR consulting for companies across Japan.',
            ja: '労働者派遣、有料職業紹介、日本語研修、及び日本全国の企業向け国際人材コンサルティング。',
            bn: 'জাপান জুড়ে কোম্পানিগুলির জন্য শ্রম ডিসপ্যাচ, কর্মসংস্থান নিয়োগ, জাপানি ভাষা প্রশিক্ষণ এবং আন্তর্জাতিক এইচআর পরামর্শ।',
          },
        },
        photoFallbackText: {
          en: 'Office photo coming soon',
          ja: 'オフィス写真は近日公開',
          bn: 'অফিসের ছবি শীঘ্রই আসছে',
        },
        yearsBadge: {
          years: 17,
          label: { en: 'In business for {years} years', ja: '創業{years}年', bn: '{years} বছর ধরে ব্যবসায়' },
        },
        viewFullPageCta: {
          label: { en: 'View full company page', ja: '会社情報の詳細を見る', bn: 'সম্পূর্ণ কোম্পানি পেজ দেখুন' },
          href: '/company',
        },
      },

      // ── 8. Compliance Grid ───────────────────────────────────────────────
      {
        blockType: 'compliance-grid',
        eyebrow: { en: 'Compliance & Certifications', ja: 'コンプライアンス・認証', bn: 'কমপ্লায়েন্স ও সনদপত্র' },
        heading: { en: 'Licenses & Compliance', ja: '許認可・法令遵守', bn: 'লাইসেন্স ও কমপ্লায়েন্স' },
        intro: {
          en: 'Saidatech operates under all required licences and certifications to provide labour dispatch, employment placement, and international HR services in Japan.',
          ja: 'サイダテックは、日本での労働者派遣・有料職業紹介・国際人材サービスの提供に必要な許認可をすべて取得しています。',
          bn: 'সাইদাটেক জাপানে শ্রম ডিসপ্যাচ, কর্মসংস্থান নিয়োগ এবং আন্তর্জাতিক এইচআর সেবা প্রদানের জন্য সমস্ত প্রয়োজনীয় লাইসেন্স ও সনদপত্র নিয়ে পরিচালিত হয়।',
        },
        licenses: [
          {
            title: { en: 'General Worker Dispatch License', ja: '労働者派遣事業許可', bn: 'জেনারেল ওয়ার্কার ডিসপ্যাচ লাইসেন্স' },
            issuer: { en: 'Aichi Labour Bureau — Certified', ja: '愛知労働局 許可済', bn: 'আইচি লেবার ব্যুরো — সার্টিফাইড' },
            licenseNumber: { en: 'No. XX-XXXXXX', ja: '第XX-XXXXXXX号', bn: 'নং XX-XXXXXX' },
            icon: 'shield',
          },
          {
            title: { en: 'Paid Employment Placement License', ja: '有料職業紹介事業許可', bn: 'পেইড এমপ্লয়মেন্ট প্লেসমেন্ট লাইসেন্স' },
            issuer: { en: 'Aichi Labour Bureau — Certified', ja: '愛知労働局 許可済', bn: 'আইচি লেবার ব্যুরো — সার্টিফাইড' },
            licenseNumber: { en: 'No. XX-XXXXXXX', ja: '第XX-XXXXXXX号', bn: 'নং XX-XXXXXXX' },
            icon: 'certificate',
          },
          {
            title: { en: 'Privacy Mark Certified', ja: 'プライバシーマーク認定', bn: 'প্রাইভেসি মার্ক সার্টিফাইড' },
            issuer: { en: 'JIPDEC — Japan Information Processing Development Corporation', ja: 'JIPDEC 一般財団法人日本情報経済社会推進協会', bn: 'JIPDEC — জাপান ইনফরমেশন প্রসেসিং ডেভেলপমেন্ট কর্পোরেশন' },
            icon: 'badge',
          },
          {
            title: { en: 'ISO 9001 Certified', ja: 'ISO 9001 認証取得', bn: 'ISO 9001 সার্টিফাইড' },
            issuer: { en: 'Quality Management System', ja: '品質マネジメントシステム', bn: 'কোয়ালিটি ম্যানেজমেন্ট সিস্টেম' },
            icon: 'check',
          },
        ],
        commitmentsHeading: {
          en: 'Our Compliance Commitments',
          ja: 'コンプライアンスへの取り組み',
          bn: 'আমাদের কমপ্লায়েন্স প্রতিশ্রুতি',
        },
        commitments: [
          {
            text: {
              en: 'Strict protection of all staff and client personal data in accordance with Japan\'s Act on the Protection of Personal Information.',
              ja: '個人情報保護法に基づく、スタッフおよびクライアントの個人情報の厳格な保護。',
              bn: 'জাপানের ব্যক্তিগত তথ্য সুরক্ষা আইন অনুযায়ী সকল কর্মী ও ক্লায়েন্টের ব্যক্তিগত তথ্যের কঠোর সুরক্ষা।',
            },
          },
          {
            text: {
              en: 'Full legal compliance and robust internal governance across all recruitment, dispatch, and placement activities.',
              ja: '採用・派遣・紹介のすべての業務における完全な法令遵守と強固な内部ガバナンス。',
              bn: 'সমস্ত নিয়োগ, ডিসপ্যাচ এবং নিয়োগ কার্যক্রমে সম্পূর্ণ আইনগত সম্মতি এবং শক্তিশালী অভ্যন্তরীণ শাসন।',
            },
          },
          {
            text: {
              en: 'Employment management fully aligned with Japanese labour law and the Worker Dispatching Act.',
              ja: '労働基準法および労働者派遣法に完全準拠した雇用管理。',
              bn: 'জাপানি শ্রম আইন এবং ওয়ার্কার ডিসপ্যাচিং অ্যাক্টের সাথে সম্পূর্ণভাবে সামঞ্জস্যপূর্ণ কর্মসংস্থান ব্যবস্থাপনা।',
            },
          },
          {
            text: {
              en: 'Regular staff training and audits to continuously raise service quality and compliance awareness.',
              ja: 'サービス品質とコンプライアンス意識を継続的に高めるための定期的な社員研修と監査。',
              bn: 'পরিষেবার মান এবং কমপ্লায়েন্স সচেতনতা ক্রমাগত উন্নত করতে নিয়মিত কর্মী প্রশিক্ষণ ও নিরীক্ষা।',
            },
          },
        ],
      },

      // ── 9. Downloads ─────────────────────────────────────────────────────
      {
        blockType: 'downloads-grid',
        source: 'inline',
        eyebrow: { en: 'Free Downloads', ja: '無料ダウンロード', bn: 'বিনামূল্যে ডাউনলোড' },
        heading: { en: 'Free Resource Downloads', ja: '無料リソースダウンロード', bn: 'বিনামূল্যে রিসোর্স ডাউনলোড' },
        downloadLabel: { en: 'Free Download', ja: '無料ダウンロード', bn: 'বিনামূল্যে ডাউনলোড' },
        intro: {
          en: 'Practical guides and tools for HR managers, job seekers, and companies navigating Japan\'s international workforce landscape.',
          ja: '日本の外国人材活用を進めるHR担当者、求職者、企業のための実践的なガイドとツール。',
          bn: 'জাপানের আন্তর্জাতিক কর্মশক্তির পরিবেশ নেভিগেট করা এইচআর ম্যানেজার, চাকরিপ্রার্থী এবং কোম্পানিগুলির জন্য ব্যবহারিক গাইড এবং সরঞ্জাম।',
        },
        inlineDownloads: [
          {
            categoryLabel: { en: 'Services', ja: 'サービス', bn: 'সেবাসমূহ' },
            title: { en: 'Saidatech Complete Service Brochure', ja: 'サイダテック総合サービスパンフレット', bn: 'সাইদাটেক সম্পূর্ণ সার্ভিস ব্রোশার' },
            description: { en: 'An overview of every service Saidatech offers — visa support, job matching, language training, and managed HR.', ja: 'ビザサポート、求人マッチング、語学研修、HR管理まで、全サービスの概要。', bn: 'ভিসা সহায়তা, চাকরি ম্যাচিং, ভাষা প্রশিক্ষণ এবং পরিচালিত এইচআর সহ সাইদাটেকের প্রতিটি সার্ভিসের সংক্ষিপ্ত বিবরণ।' },
            meta: { en: '12 pages', ja: '12ページ', bn: '১২ পৃষ্ঠা' },
            href: '/downloads/service-brochure',
          },
          {
            categoryLabel: { en: 'Hiring Guide', ja: '採用ガイド', bn: 'নিয়োগ গাইড' },
            title: { en: 'Manufacturing Hiring Guide', ja: '製造業採用ガイド', bn: 'ম্যানুফ্যাকচারিং হায়ারিং গাইড' },
            description: { en: 'For HR managers at Japanese manufacturers — covering dispatch vs. direct hire, onboarding checklists, and retention strategies.', ja: '日本の製造業HR向け。派遣・直接雇用の比較、入社チェックリスト、定着戦略を網羅。', bn: 'জাপানের উৎপাদন খাতের এইচআর ম্যানেজারদের জন্য — ডিসপ্যাচ বনাম সরাসরি নিয়োগ, অনবোর্ডিং চেকলিস্ট এবং ধরে রাখার কৌশল।' },
            meta: { en: '20 pages', ja: '20ページ', bn: '২০ পৃষ্ঠা' },
            href: '/downloads/manufacturing-hiring-guide',
          },
          {
            categoryLabel: { en: 'Foreign Workers', ja: '外国人材', bn: 'বিদেশী কর্মী' },
            title: { en: 'SSW & TITP Acceptance Handbook', ja: '特定技能・技能実習 受入ハンドブック', bn: 'এসএসডাব্লিউ ও টিআইটিপি গ্রহণ হ্যান্ডবুক' },
            description: { en: 'Step-by-step procedures for accepting Specified Skilled Workers and Technical Intern Trainees — legal obligations, support requirements, and reporting duties.', ja: '特定技能・技能実習生の受入手順。法的義務・サポート要件・届出手続きを完全解説。', bn: 'বিশেষায়িত দক্ষ কর্মী এবং টেকনিক্যাল ইন্টার্ন ট্রেইনি গ্রহণের ধাপে ধাপে প্রক্রিয়া।' },
            meta: { en: '16 pages', ja: '16ページ', bn: '১৬ পৃষ্ঠা' },
            href: '/downloads/ssw-titp-handbook',
          },
          {
            categoryLabel: { en: 'Tools', ja: 'ツール', bn: 'সরঞ্জাম' },
            title: { en: 'Staffing Cost Calculator', ja: '採用コスト計算ツール', bn: 'স্টাফিং কস্ট ক্যালকুলেটর' },
            description: { en: 'Compare the total cost of dispatch, direct hire, and outsourced staffing side by side — including visa fees, training costs, and 12-month retention projections.', ja: '派遣・直接雇用・業務委託の総コストを比較。ビザ費用・研修費・12ヶ月定着予測を含む。', bn: 'ডিসপ্যাচ, সরাসরি নিয়োগ এবং আউটসোর্সড স্টাফিংয়ের মোট ব্যয় পাশাপাশি তুলনা করুন।' },
            meta: { en: 'Excel file', ja: 'Excelファイル', bn: 'এক্সেল ফাইল' },
            href: '/downloads/staffing-cost-calculator',
          },
        ],
        viewAllCta: {
          label: { en: 'View all resources', ja: '資料一覧を見る', bn: 'সমস্ত রিসোর্স দেখুন' },
          href: '/downloads',
        },
      },

      // ── 10. Blog Teaser ──────────────────────────────────────────────────
      {
        blockType: 'blog-teaser',
        eyebrow: { en: 'Column & Journal', ja: 'コラム・ジャーナル', bn: 'কলাম ও জার্নাল' },
        heading: { en: 'Insights & Resources', ja: 'インサイト・リソース', bn: 'অন্তর্দৃষ্টি ও রিসোর্স' },
        readMoreLabel: { en: 'Read more', ja: '続きを読む', bn: 'আরও পড়ুন' },
        minReadSuffix: { en: 'min read', ja: '分で読める', bn: 'মিনিট পড়া' },
        intro: {
          en: 'Stay up to date with the latest trends in Japanese HR, visa regulations, and workforce management.',
          ja: '日本のHR・ビザ規制・人材管理の最新トレンドをキャッチ。',
          bn: 'জাপানি এইচআর, ভিসা বিধিমালা এবং কর্মশক্তি ব্যবস্থাপনার সর্বশেষ প্রবণতা সম্পর্কে আপডেট থাকুন।',
        },
        postsSource: 'selected',
        selectedPosts: blogIds,
        viewAllCta: {
          label: { en: 'View all articles', ja: '記事一覧を見る', bn: 'সমস্ত নিবন্ধ দেখুন' },
          href: '/blog',
        },
      },

      // ── 11. News List ─────────────────────────────────────────────────────
      {
        blockType: 'news-list',
        source: 'inline',
        eyebrow: { en: 'News & Updates', ja: 'ニュース・お知らせ', bn: 'নিউজ ও আপডেট' },
        heading: { en: 'Latest News', ja: '最新情報', bn: 'সর্বশেষ খবর' },
        intro: {
          en: 'Company announcements, event listings, and press releases from Saidatech.',
          ja: 'サイダテックからの会社発表、イベント情報、プレスリリース。',
          bn: 'সাইদাটেকের কোম্পানি ঘোষণা, ইভেন্ট তালিকা এবং প্রেস রিলিজ।',
        },
        inlineItems: [
          {
            date: '2026-05-10',
            category: { en: 'Event', ja: 'イベント', bn: 'ইভেন্ট' },
            headline: { en: 'Exhibiting at the Aichi Manufacturing Joint Job Fair', ja: '愛知製造業合同企業説明会に出展', bn: 'আইচি ম্যানুফ্যাকচারিং জয়েন্ট জব ফেয়ারে প্রদর্শনী' },
            href: '/news/aichi-manufacturing-job-fair-2026',
          },
          {
            date: '2026-04-28',
            category: { en: 'Announcement', ja: 'お知らせ', bn: 'ঘোষণা' },
            headline: { en: 'Nagoya Office Relocation — New Address from May 2026', ja: '名古屋オフィス移転のお知らせ（2026年5月より）', bn: 'নাগোয়া অফিস স্থানান্তর — মে ২০২৬ থেকে নতুন ঠিকানা' },
            href: '/news/nagoya-office-relocation-2026',
          },
          {
            date: '2026-04-15',
            category: { en: 'Press Release', ja: 'プレスリリース', bn: 'প্রেস রিলিজ' },
            headline: { en: 'Registered Staff Count Surpasses 5,000', ja: '登録スタッフ数が5,000名を突破', bn: 'নিবন্ধিত কর্মী সংখ্যা ৫,০০০ ছাড়িয়ে গেছে' },
            href: '/news/registered-staff-surpasses-5000',
          },
          {
            date: '2026-04-01',
            category: { en: 'Jobs', ja: '求人', bn: 'চাকরি' },
            headline: { en: 'New Job Listings for Toyota-Area Factories', ja: 'トヨタエリアの工場求人を新規公開', bn: 'টয়োটা-এলাকার কারখানার জন্য নতুন চাকরির তালিকা' },
            href: '/news/new-toyota-area-factory-listings',
          },
          {
            date: '2026-03-25',
            category: { en: 'Announcement', ja: 'お知らせ', bn: 'ঘোষণা' },
            headline: { en: 'Office Hours During Golden Week 2026', ja: '2026年ゴールデンウィーク期間中の営業時間', bn: '২০২৬ সালের গোল্ডেন উইকের সময় অফিসের সময়সূচি' },
            href: '/news/golden-week-office-hours-2026',
          },
        ],
        viewAllCta: {
          label: { en: 'View all', ja: 'すべて見る', bn: 'সমস্ত দেখুন' },
          href: '/news',
        },
      },

      // ── 12. CTA Banner ───────────────────────────────────────────────────
      {
        blockType: 'cta-banner',
        eyebrow: { en: 'Get in Touch', ja: 'お問い合わせ', bn: 'যোগাযোগ করুন' },
        heading: { en: 'Ready to start your Japan career journey?', ja: '日本でのキャリアを始めませんか？', bn: 'জাপানে আপনার ক্যারিয়ার শুরু করতে প্রস্তুত?' },
        body: {
          en: "Our team typically responds within one business day. We'll review your profile and connect you with the right service path.",
          ja: '通常1営業日以内にご返信いたします。ご状況を確認のうえ、最適なサービスをご案内します。',
          bn: 'আমাদের দল সাধারণত এক কার্যদিবসের মধ্যে সাড়া দেয়। আমরা আপনার প্রোফাইল পর্যালোচনা করে সঠিক সেবার পথে সংযুক্ত করব।',
        },
        primaryButton: {
          label: { en: 'Contact Us', ja: 'お問い合わせ', bn: 'যোগাযোগ করুন' },
          href: '/contact',
        },
        secondaryButton: {
          label: { en: 'Browse Jobs', ja: '求人を見る', bn: 'চাকরি দেখুন' },
          href: '/jobs',
        },
        variant: 'gradient',
      },
    ],
  })
}
