// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // FAQ translations
      "faqheading": "Frequently Asked Questions",
      "faq.question1": "What is the Smart Irrigation System?",
      "faq.answer1": "The Smart Irrigation System is an automated solution that optimizes water usage by analyzing real-time soil moisture, crop requirements, and weather conditions. It helps farmers and gardeners ensure efficient water delivery with minimal waste.",
      "faq.question2": "How does the system work?",
      "faq.answer2": "Our system uses sensors to monitor soil moisture and weather forecasts. Based on crop data and predefined thresholds, it decides whether to activate or deactivate the water pump. Users can monitor and control the pump remotely through a cloud-based web app.",
      "faq.question3": "What crops can the system support?",
      "faq.answer3": "The system supports a wide range of crops by utilizing datasets with specific water requirements for each crop. Simply select the crop you are growing, and the system will adjust watering schedules accordingly.",
      "faq.question4": "Can I control the irrigation remotely?",
      "faq.answer4": "Yes! You can monitor sensor data and manage the pump status remotely through our web app. You’ll receive real-time updates on soil conditions and pump activity to stay informed about your farm.",
      "faq.question5": "What happens if it rains unexpectedly?",
      "faq.answer5": "The system integrates with weather APIs to predict rainfall. If rain is forecasted, it will delay or skip irrigation to conserve water. You can also configure manual overrides if needed.",
      "faq.question6": "How often is the soil moisture data updated?",
      "faq.answer6": "The system collects data from soil moisture sensors in real-time or at scheduled intervals. The frequency can be customized based on crop type and farm conditions to ensure precise watering.",
      "faq.question7": "What if the internet connection is lost?",
      "faq.answer7": "In case of connectivity issues, the system can run in offline mode using pre-configured thresholds and schedules. As soon as the connection is restored, it will sync with the cloud and update the data.",
        

       // Info sections translations
       "info.section1.title": "What is an Automated Irrigation System?",
       "info.section1.content1": "An automated irrigation system uses IoT-based sensors to monitor soil moisture and automate water delivery to crops. It ensures the right amount of water is supplied at the right time, improving crop yield while conserving water.",
       "info.section1.content2": "By analyzing environmental data and crop requirements, the system can activate or deactivate pumps, minimizing water waste and promoting sustainable agriculture.",
 
       "info.section2.title": "Why is Smart Irrigation Important?",
       "info.section2.content1": "Efficient irrigation management reduces water consumption and helps prevent over-watering or under-watering of crops.",
       "info.section2.content2": "Smart irrigation promotes sustainable farming practices, ensuring optimal crop health and minimizing resource wastage.",
       "info.section2.content3": "It enables farmers to make data-driven decisions by integrating weather forecasts, crop-specific data, and soil health information.",
 
       "info.section3.title": "How Our System Works",
       "info.section3.content1": "Our system collects data from soil moisture sensors and sends it to the cloud in real-time.",
       "info.section3.content2": "Using crop-specific datasets and weather APIs, the system analyzes moisture levels to determine whether irrigation is needed.",
       "info.section3.content3": "If needed, the system activates the motor remotely, delivering the precise amount of water required.",
       "info.section3.content4": "Users can monitor the status of the pump and receive notifications through our web application.",
 
       "info.section4.title": "Key Features of Our System",
       "info.section4.content1": "Real-time soil moisture monitoring with IoT sensors.",
       "info.section4.content2": "Integration with weather APIs for accurate predictions.",
       "info.section4.content3": "Automated motor control for irrigation.",
       "info.section4.content4": "User-friendly web interface for monitoring and management.",
       "info.section4.content5": "Cloud storage of historical data for insights and analytics.",
 
       "info.section5.title": "Our Goals",
       "info.section5.content1": "Efficient Water Management through Smart Irrigation.",
       "info.section5.content2": "Improving Crop Yield with Automated Systems.",
       "info.section5.content3": "Supporting Farmers with Data-Driven Insights.",
       "info.section5.content4": "Promoting Sustainable and Resource-Conscious Agriculture.",
 
       "info.section6.title": "Get Started with Smart Irrigation",
       "info.section6.content1": "Begin your journey towards efficient water management with our automated irrigation system. With just a few steps, you can monitor, control, and optimize your irrigation process from anywhere, ensuring sustainable use of water resources and healthy crops.",
 

       // HomePage texts
       "homepage.title": "Efficient Farming with Smart Irrigation",
       "homepage.description": "Optimize water usage with an intelligent system that analyzes soil conditions, crop needs, and weather forecasts. Stay updated through our web platform and ensure your crops get the water they need when they need it.",
       "homepage.getStarted": "Get Started",
       "homepage.viewMore": "View More",

       // Testimonials Section
       "testimonialsheading": "What people are saying.",
       "testimonialsdescription": "Hear from those who’ve experienced the impact firsthand.",
      "testimonials.0.message": "The AI-powered crop recommendation feature has transformed how we choose crops for our fields. It ensures that we plant the right crop for the soil and weather, leading to better productivity and sustainable farming.",
      "testimonials.0.name": "Dr. Arjun Patel",
      "testimonials.0.role": "Agronomist",

      "testimonials.1.message": "With personalized fertilizer suggestions, we’ve optimized crop nutrition and reduced waste. The precise recommendations have improved the health of our crops while lowering costs.",
      "testimonials.1.name": "Priya Mehta",
      "testimonials.1.role": "Agricultural Consultant",

      "testimonials.2.message": "The crop yield prediction tool has been a game-changer for our farm. It gives us a clear understanding of potential yields, helping us plan for harvests and manage resources more effectively.",
      "testimonials.2.name": "Suresh Kumar",
      "testimonials.2.role": "Farm Manager",

      "testimonials.3.message": "The combination of weather data, crop recommendations, and irrigation control has greatly benefited our village's agricultural efforts. This platform provides all the insights we need in one place.",
      "testimonials.3.name": "Anjali Singh",
      "testimonials.3.role": "Local Government Official",

      "testimonials.4.message": "The system’s AI-driven insights have been pivotal in identifying crops suited for varying soil conditions across our region. It has empowered farmers to make better planting decisions.",
      "testimonials.4.name": "Rahul Desai",
      "testimonials.4.role": "Soil Scientist",

      "testimonials.5.message": "Since using this platform, my farm’s yield has improved significantly. The crop recommendation and irrigation control tools have taken the guesswork out of farming and made everything more efficient.",
      "testimonials.5.name": "Ravi Sharma",
      "testimonials.5.role": "Farmer",

      // Features Card Section

        "featureCardheading": "Explore our Features",
        "featureCarddescription":"Explore how our smart irrigation system empowers farmers with real-time data and intelligent automation for efficient water management.",

        "featuresCard.title1": "Crop Recommendation",
        "featuresCard.description1": "Recommends Location wise suitable crops based on soil types and region specific weather",

        "featuresCard.title2": "PestPedia",
        "featuresCard.description2": "PestPedia helps identify pests, their impact on crops, and the best pesticides for control. It provides eco-friendly pest management solutions.",

        "featuresCard.title3": "Crop Swapping & Optimization",
        "featuresCard.description3": "Predict crop yield and production based on location and real-time weather updates. Optimize crop selection for better productivity and sustainability.",

        "featuresCard.title4": "Crop Market Trend Analyzer",
        "featuresCard.description4": "Analyze the crop and vegetable prices in market and provide suggestions to optimize farmer's profit",


        // Features Section
        featureheading: "Our Features",
        featuredescription: "Explore the key features of our smart irrigation system that help you manage water efficiently and promote sustainable farming practices.",

        feature1title:"Real-Time Soil Monitoring",
        feature1description:"Track soil moisture levels in real-time to maintain ideal growing conditions for your crops.",
        feature2title:"Smart Automated Irrigation",
        feature2description:"Automatically control water pumps based on real-time sensor readings and specific crop needs, reducing manual effort.",
        feature3title:"Maximized Water Efficiency",
        feature3description:"Leverage predictive analytics to minimize water wastage, ensuring sustainable farming and healthy crops.",
        feature4title:"Weather-Aware Irrigation",
        feature4description:"Adjust irrigation schedules dynamically with weather forecasts, ensuring water is not wasted before rain.",

        // Map Card Section
        "mapCardheading": "Why Smart Irrigation Matters?",
        "mapCarddescription1": "Monitor soil moisture in real-time to optimize water usage and reduce waste.",
        "mapCarddescription2": "Utilize geolocation and weather data to predict irrigation needs accurately.",
        "mapCarddescription3": "Automate water pumps remotely via cloud control, ensuring crops receive water when they need it.",

        // Optimal Crop Season Card Section
        "optimalCropSeasonCardheading": "Optimal Crop Season Predictor",
        "optimalCropSeasonCarddescription": "The Optimal Cropping Season Predictor is an intelligent tool designed to help users determine the ideal season for growing specific crops. It analyzes a variety of factors, including croppingyear, crop type, and state, to provide accurate recommendations,ensuring farmers achieve the best yield with minimal water and resource usage.",
        "optimalCropSeasonCardbutton":" Find Optimal Cropping Season",

        // GeoSpatial Analysis Card Section
        "geoSpatialAnalysisCardheading": "Geospatial Analysis of Crops",
        "geoSpatialAnalysisdescription":"Explore crop patterns and production trends with heatmaps and seasonal analysis. Our system enables you to visualize historical crop yields and areas, analyze patterns across different seasons, and generate insights for better agricultural decisions. Select crop types, districts, or seasons to discover hidden patterns through visual representations.",
        "geoSpatialAnalysisbutton":" Start Geospatial Analysis",

        // Contact Us Section
        "contactusheading":"Contact Us",
        "contactusdescription":"Got a technical issue? Want to send feedback about a beta feature Need details about our Business plan? Let us know.",
    },
  },
  te: {
    translation: {
      // FAQ translations in Telugu
      "faqheading":"తరచుగా అడిగే ప్రశ్నలు",
      "faq.question1": "స్మార్ట్ ఇర్రిగేషన్ సిస్టమ్ అంటే ఏమిటి?",
      "faq.answer1": "స్మార్ట్ ఇర్రిగేషన్ సిస్టమ్ అనేది నేల ఆర్ద్రత, పంటల అవసరాలు మరియు వాతావరణ పరిస్థితులను విశ్లేషించి నీటి వినియోగాన్ని ఆప్టిమైజ్ చేసే ఆటోమేటెడ్ సొల్యూషన్. ఇది రైతులు మరియు తోటల యజమానులకు కనీస వ్యర్థంతో సమర్థవంతమైన నీటి సరఫరాను నిర్ధారించడంలో సహాయపడుతుంది.",
      "faq.question2": "ఈ సిస్టమ్ ఎలా పని చేస్తుంది?",
      "faq.answer2": "మా సిస్టమ్ నేల ఆర్ద్రత మరియు వాతావరణ అంచనాలను పర్యవేక్షించడానికి సెన్సార్లను ఉపయోగిస్తుంది. పంట డేటా మరియు ముందే నిర్వచించిన థ్రెషోల్డ్ల ఆధారంగా, ఇది నీటి పంపును సక్రియం చేయాలా వద్దా అని నిర్ణయిస్తుంది. వినియోగదారులు క్లౌడ్-బేస్డ్ వెబ్ అప్లికేషన్ ద్వారా రిమోట్లో పంప్ స్థితిని పర్యవేక్షించవచ్చు మరియు నియంత్రించవచ్చు.",
      "faq.question3": "ఈ సిస్టమ్ ఏ పంటలకు మద్దతు ఇస్తుంది?",
      "faq.answer3": "ప్రతి పంటకు నిర్దిష్ట నీటి అవసరాలతో డేటాసెట్లను ఉపయోగించడం ద్వారా ఈ సిస్టమ్ విస్తృత పంటలకు మద్దతు ఇస్తుంది. మీరు పండించే పంటను ఎంచుకోండి, సిస్టమ్ తగిన నీటి షెడ్యూల్లను స్వయంచాలకంగా సర్దుబాటు చేస్తుంది.",
      "faq.question4": "నేను రిమోట్గా సాగునీటిని నియంత్రించగలనా?",
      "faq.answer4": "అవును! మీరు మా వెబ్ అప్లికేషన్ ద్వారా సెన్సార్ డేటాను పర్యవేక్షించవచ్చు మరియు పంప్ స్థితిని నిర్వహించవచ్చు. మీ పొలం గురించి సమాచారం పొందడానికి నేల పరిస్థితులు మరియు పంప్ కార్యాచరణపై రియల్-టైమ్ నవీకరణలను పొందుతారు.",
      "faq.question5": "ఊహించని వర్షాలు పడితే ఏమి జరుగుతుంది?",
      "faq.answer5": "వర్షపాతాన్ని అంచనా వేయడానికి సిస్టమ్ వెదర్ APIలతో సమన్వయిస్తుంది. వర్షం అంచనా వేస్తే, నీటిని ఆదా చేయడానికి సాగునీటిని వాయిదా వేస్తుంది లేదా దాటవేస్తుంది. అవసరమైతే మాన్యువల్ ఓవర్రైడ్లను కూడా కాన్ఫిగర్ చేయవచ్చు.",
      "faq.question6": "నేల ఆర్ద్రత డేటా ఎంత తరచుగా నవీకరించబడుతుంది?",
      "faq.answer6": "సిస్టమ్ నేల ఆర్ద్రత సెన్సార్ల నుండి డేటాను రియల్-టైమ్లో లేదా షెడ్యూల్ చేసిన విరామాల్లో సేకరిస్తుంది. ఖచ్చితమైన సాగునీటిని నిర్ధారించడానికి పంట రకం మరియు పొల పరిస్థితుల ఆధారంగా ఫ్రీక్వెన్సీని కస్టమైజ్ చేయవచ్చు.",
      "faq.question7": "ఇంటర్నెట్ కనెక్షన్ కోల్పోతే ఏమి చేయాలి?",
      "faq.answer7": "కనెక్టివిటీ సమస్యల సందర్భంలో, సిస్టమ్ ప్రీ-కాన్ఫిగర్ చేసిన థ్రెషోల్డ్లు మరియు షెడ్యూల్లను ఉపయోగించి ఆఫ్లైన్ మోడ్లో నడపవచ్చు. కనెక్షన్ పునరుద్ధరించబడిన వెంటనే, ఇది క్లౌడ్తో సమకాలీకరించబడుతుంది మరియు డేటాను నవీకరిస్తుంది.",

      // Info sections translations in Telugu
      "info.section1.title": "ఆటోమేటెడ్ ఇర్రిగేషన్ సిస్టమ్ అంటే ఏమిటి?",
      "info.section1.content1": "ఆటోమేటెడ్ ఇర్రిగేషన్ సిస్టమ్ IoT-బేస్డ్ సెన్సార్లను ఉపయోగించి నేల ఆర్ద్రతను పర్యవేక్షిస్తుంది మరియు పంటలకు నీటి సరఫరాను ఆటోమేట్ చేస్తుంది. సరైన సమయంలో సరైన నీటిని సరఫరా చేయడం ద్వారా పంట దిగుబడిని మెరుగుపరుస్తుంది మరియు నీటిని సంరక్షిస్తుంది.",
      "info.section1.content2": "పర్యావరణ డేటా మరియు పంట అవసరాలను విశ్లేషించడం ద్వారా, సిస్టమ్ పంప్లను సక్రియం లేదా నిష్క్రియం చేయగలదు, నీటి వ్యర్థాన్ని తగ్గిస్తుంది మరియు స్థిరమైన వ్యవసాయాన్ని ప్రోత్సహిస్తుంది.",

      "info.section2.title": "స్మార్ట్ ఇర్రిగేషన్ ఎందుకు ముఖ్యమైనది?",
      "info.section2.content1": "సమర్థవంతమైన సాగునీటి నిర్వహణ నీటి వినియోగాన్ని తగ్గిస్తుంది మరియు పంటలను అధికంగా నీరు పెట్టడం లేదా తక్కువ పెట్టడం నివారించడంలో సహాయపడుతుంది.",
      "info.section2.content2": "స్మార్ట్ ఇర్రిగేషన్ స్థిరమైన వ్యవసాయ పద్ధతులను ప్రోత్సహిస్తుంది, పంటల ఆరోగ్యాన్ని ఉత్తమం చేస్తుంది మరియు వనరుల వ్యర్థాన్ని తగ్గిస్తుంది.",
      "info.section2.content3": "వాతావరణ అంచనాలు, పంట-నిర్దిష్ట డేటా మరియు నేల ఆరోగ్య సమాచారాన్ని సమగ్రపరచడం ద్వారా రైతులు డేటా-ఆధారిత నిర్ణయాలు తీసుకోవడానికి ఇది అనుమతిస్తుంది.",

      "info.section3.title": "మా సిస్టమ్ ఎలా పనిచేస్తుంది",
      "info.section3.content1": "మా సిస్టమ్ నేల ఆర్ద్రత సెన్సార్ల నుండి డేటాను సేకరిస్తుంది మరియు రియల్-టైమ్లో క్లౌడ్కు పంపుతుంది.",
      "info.section3.content2": "పంట-నిర్దిష్ట డేటాసెట్లు మరియు వాతావరణ APIలను ఉపయోగించి, సాగునీరు అవసరమైనదో లేదో నిర్ణయించడానికి సిస్టమ్ ఆర్ద్రత స్థాయిలను విశ్లేషిస్తుంది.",
      "info.section3.content3": "అవసరమైతే, సిస్టమ్ రిమోట్గా మోటారును సక్రియం చేస్తుంది, అవసరమైన ఖచ్చితమైన నీటిని సరఫరా చేస్తుంది.",
      "info.section3.content4": "వినియోగదారులు మా వెబ్ అప్లికేషన్ ద్వారా పంప్ స్థితిని పర్యవేక్షించవచ్చు మరియు నోటిఫికేషన్లను స్వీకరించవచ్చు.",

      "info.section4.title": "మా సిస్టమ్ యొక్క ప్రధాన లక్షణాలు",
      "info.section4.content1": "IoT సెన్సార్లతో రియల్-టైమ్ నేల ఆర్ద్రత పర్యవేక్షణ",
      "info.section4.content2": "ఖచ్చితమైన అంచనాల కోసం వాతావరణ APIలతో ఇంటిగ్రేషన్",
      "info.section4.content3": "సాగునీటి కోసం ఆటోమేటెడ్ మోటార్ కంట్రోల్",
      "info.section4.content4": "పర్యవేక్షణ మరియు నిర్వహణ కోసం యూజర్-ఫ్రెండ్లీ వెబ్ ఇంటర్ఫేస్",
      "info.section4.content5": "ఇన్సైట్స్ మరియు విశ్లేషణల కోసం చారిత్రక డేటా యొక్క క్లౌడ్ స్టోరేజ్",

      "info.section5.title": "మా లక్ష్యాలు",
      "info.section5.content1": "స్మార్ట్ ఇర్రిగేషన్ ద్వారా సమర్థవంతమైన నీటి నిర్వహణ",
      "info.section5.content2": "ఆటోమేటెడ్ సిస్టమ్లతో పంట దిగుబడిని మెరుగుపరచడం",
      "info.section5.content3": "డేటా-ఆధారిత అంతర్దృష్టులతో రైతులకు మద్దతు",
      "info.section5.content4": "స్థిరమైన మరియు వనరుల-జాగ్రత్తగల వ్యవసాయాన్ని ప్రోత్సహించడం",

      "info.section6.title": "స్మార్ట్ ఇర్రిగేషన్తో ప్రారంభించండి",
      "info.section6.content1": "మా ఆటోమేటెడ్ ఇర్రిగేషన్ సిస్టమ్తో సమర్థవంతమైన నీటి నిర్వహణ వైపు మీ ప్రయాణాన్ని ప్రారంభించండి. కేవలం కొన్ని దశలతో, మీరు ఎక్కడి నుండైనా సాగునీటి ప్రక్రియను పర్యవేక్షించవచ్చు, నియంత్రించవచ్చు మరియు ఆప్టిమైజ్ చేయవచ్చు, నీటి వనరుల స్థిరమైన ఉపయోగం మరియు ఆరోగ్యకరమైన పంటలను నిర్ధారిస్తుంది.",

      // HomePage texts in Telugu
      "homepage.title": "స్మార్ట్ ఇర్రిగేషన్తో సమర్థవంతమైన వ్యవసాయం",
      "homepage.description": "నేల పరిస్థితులు, పంటల అవసరాలు మరియు వాతావరణ అంచనాలను విశ్లేషించే స్మార్ట్ సిస్టమ్తో నీటి వినియోగాన్ని ఆప్టిమైజ్ చేయండి. మీ పంటలకు అవసరమైన నీరు సరైన సమయంలో లభిస్తుందని నిర్ధారించుకోవడానికి మా వెబ్ ప్లాట్ఫారమ్ ద్వారా నవీకరించబడండి.",
      "homepage.getStarted": "ప్రారంభించండి",
      "homepage.viewMore": "మరిన్ని చూడండి",

      // Testimonials Section in Telugu
      "testimonialsheading": "మనం గురించి ఏమంటున్నారు?",  
"testimonialsdescription": "మా సేవల ప్రభావాన్ని ప్రత్యక్షంగా అనుభవించినవారి మాటల్లో వినండి.",

      "testimonials.0.message": "AI-శక్తివంతమైన పంట సిఫారసు సౌలభ్యం మేము మా పొలాలకు పంటలను ఎంచుకునే విధానాన్ని మార్చివేసింది. నేల మరియు వాతావరణానికి సరిపోయే సరైన పంటలను నాటడాన్ని ఇది నిర్ధారిస్తుంది, ఇది మెరుగైన ఉత్పాదకత మరియు స్థిరమైన వ్యవసాయానికి దారి తీస్తుంది.",
      "testimonials.0.name": "డాక్టర్ అర్జున్ పటేల్",
      "testimonials.0.role": "కృషి శాస్త్రవేత్త",

      "testimonials.1.message": "వ్యక్తిగత ఎరువు సూచనలతో, మేము పంట పోషణను ఆప్టిమైజ్ చేసాము మరియు వ్యర్థాన్ని తగ్గించాము. ఖచ్చితమైన సిఫారసులు మా పంటల ఆరోగ్యాన్ని మెరుగుపరిచాయి మరియు ఖర్చులను తగ్గించాయి.",
      "testimonials.1.name": "ప్రియ మెహతా",
      "testimonials.1.role": "వ్యవసాయ సలహాదారు",

      "testimonials.2.message": "పంట దిగుబడి అంచనా సాధనం మా పొలానికి గేమ్-చేంజర్గా నిలిచింది. ఇది సంభావ్య దిగుబడులపై స్పష్టమైన అవగాహనను ఇస్తుంది, కోతల కోసం ప్రణాళిక రూపకల్పన మరియు వనరుల నిర్వహణలో సహాయపడుతుంది.",
      "testimonials.2.name": "సురేష్ కుమార్",
      "testimonials.2.role": "ఫామ్ మేనేజర్",

      "testimonials.3.message": "వాతావరణ డేటా, పంట సిఫారసులు మరియు సాగునీటి నియంత్రణ కలయిక మా గ్రామం వ్యవసాయ ప్రయత్నాలకు గొప్ప ప్రయోజనం చేకూర్చింది. ఈ ప్లాట్ఫారమ్ అన్ని అవసరమైన అంతర్దృష్టులను ఒకే ప్రదేశంలో అందిస్తుంది.",
      "testimonials.3.name": "అంజలి సింగ్",
      "testimonials.3.role": "స్థానిక ప్రభుత్వ అధికారి",

      "testimonials.4.message": "సిస్టమ్ యొక్క AI-డ్రైవ్ అంతర్దృష్టులు మా ప్రాంతంలోని వివిధ నేల పరిస్థితులకు అనుగుణంగా ఉన్న పంటలను గుర్తించడంలో కీలక పాత్ర పోషించాయి. ఇది రైతులకు మంచి నాటే నిర్ణయాలు తీసుకోవడానికి అధికారం ఇచ్చింది.",
      "testimonials.4.name": "రాహుల్ దేశాయి",
      "testimonials.4.role": "నేల శాస్త్రవేత్త",

      "testimonials.5.message": "ఈ ప్లాట్ఫారమ్ను ఉపయోగించినప్పటి నుండి, నా పొలం దిగుబడి గణనీయంగా మెరుగుపడింది. పంట సిఫారసు మరియు సాగునీటి నియంత్రణ సాధనాలు అంచనాలను తీసివేసి ప్రతిదీ మరింత సమర్థవంతంగా చేసాయి.",
      "testimonials.5.name": "రవి శర్మ",
      "testimonials.5.role": "రైతు",

      // Features Card Section in Telugu
      "featureCardheading": "మా విశేషాలను అన్వేషించండి",
      "featureCarddescription":"రియల్-టైమ్ డేటా మరియు తెలివైన ఆటోమేషన్తో రైతులకు శక్తినిచ్చే మా స్మార్ట్ ఇర్రిగేషన్ సిస్టమ్ ఎలా పనిచేస్తుందో అన్వేషించండి.",

      "featuresCard.title1": "పంట సిఫారసు",
      "featuresCard.description1": "నేల రకాలు మరియు ప్రాంత-నిర్దిష్ట వాతావరణం ఆధారంగా సరిపోయే పంటలను సిఫారసు చేస్తుంది",

      "featuresCard.title2": "PestPedia",
      "featuresCard.description2": "కీటకాలను గుర్తించి, వాటి ప్రభావాన్ని అర్థం చేసుకుని, సరైన కీటకనాశనాలను ఎంచుకోవడానికి సహాయపడుతుంది",

      "featuresCard.title3": "పంట మార్పు & ఆప్టిమైజేషన్",
      "featuresCard.description3": "భౌగోళిక స్థానం మరియు తక్షణ వాతావరణ నవీకరణల ఆధారంగా పంట దిగుబడి మరియు ఉత్పత్తిని ఊహించండి. మెరుగైన ఉత్పాదకత మరియు స్థిరత్వానికి పంట ఎంపికను మెరుగుపరచండి.",

      "featuresCard.title4": "పంట మార్కెట్ ట్రెండ్ విశ్లేషకుడు",
      "featuresCard.description4": "మార్కెట్లో పంటలు మరియు కూరగాయల ధరలను విశ్లేషించి రైతుల లాభాన్ని ఆప్టిమైజ్ చేయడానికి సూచనలను అందిస్తుంది",

      // Features Section in Telugu
featureheading: "మా ఫీచర్లు",  
featuredescription: "నీటి నిర్వహణను సమర్థంగా నిర్వహించి, సుస్థిరమైన వ్యవసాయ విధానాలను ప్రోత్సహించడానికి సహాయపడే మా స్మార్ట్ ఇరిగేషన్ వ్యవస్థ యొక్క ముఖ్య ఫీచర్లను అన్వేషించండి.",  

feature1title: "రియల్-టైమ్ మట్టి మానిటరింగ్",  
feature1description: "మీ పంటలకు అనువైన పెరుగుదల పరిస్థితులను కాపాడటానికి మట్టి తేమ స్థాయిలను తక్షణమే ట్రాక్ చేయండి.",  

feature2title: "స్మార్ట్ ఆటోమేటెడ్ ఇరిగేషన్",  
feature2description: "సెన్సార్ రీడింగ్స్ మరియు నిర్దిష్ట పంట అవసరాల ఆధారంగా నీటి పంపులను ఆటోమేటిక్‌గా నియంత్రించండి, చేతితో చేసే శ్రమను తగ్గించండి.",  

feature3title: "గరిష్టమైన నీటి సామర్థ్యం",  
feature3description: "నీటి వృధాను తగ్గించేందుకు మరియు ఆరోగ్యకరమైన పంటల పెరుగుదలను నిర్ధారించేందుకు ప్రిడిక్టివ్ అనలిటిక్స్‌ను ఉపయోగించండి.",  

feature4title: "వాతావరణ ఆధారిత ఇరిగేషన్",  
feature4description: "వర్షం పడే ముందు నీరు వృధా కాకుండా ఉండేందుకు, వాతావరణ సూచనల ఆధారంగా ఇరిగేషన్ షెడ్యూల్‌ను డైనమిక్‌గా సర్దుబాటు చేయండి.",

         // Map Card Section in Telugu
           "mapCardheading": "స్మార్ట్ ఇరిగేషన్ ఎందుకు ముఖ్యమైనది?",  
"mapCarddescription1": "నీటి వినియోగాన్ని మెరుగుపరిచేందుకు మరియు వృధాను తగ్గించేందుకు మట్టి తేమను తక్షణమే పరిశీలించండి.",  
"mapCarddescription2": "సరిగ్గా పంటలకు అవసరమైన నీటి అవసరాన్ని ఊహించేందుకు భౌగోళికస్థానం మరియు వాతావరణ డేటాను ఉపయోగించండి.",  
"mapCarddescription3": "మేఘ గణన ద్వారా నీటి పంపులను రిమోట్‌గా ఆటోమేట్ చేయండి, తద్వారా పంటలకు అవసరమైనప్పుడు నీరు అందించబడుతుంది.", 

// Optimal Crop Section in Telugu
// అనుకూలమైన పంట సీజన్ కార్డ్ విభాగం  
"optimalCropSeasonCardheading": "అనుకూలమైన పంట సీజన్ సూచిక",  
"optimalCropSeasonCarddescription": "అనుకూలమైన పంట సీజన్ సూచిక అనేది ఒక బుద్ధిమంతమైన సాధనం, ఇది వినియోగదారులు నిర్దిష్ట పంటలకు అనువైన సీజన్‌ను గుర్తించడానికి సహాయపడుతుంది. ఇది పంట సంవత్సరము, పంట రకం మరియు రాష్ట్రం వంటి అనేక అంశాలను విశ్లేషించి ఖచ్చితమైన సిఫారసులను అందిస్తుంది, తద్వారా రైతులు తక్కువ నీరు మరియు వనరులతో గరిష్ట దిగుబడిని సాధించగలరు.",  
"optimalCropSeasonCardbutton": "అనుకూలమైన పంట సీజన్ కనుగొనండి",

    // GeoSpatial Analysis Section in Telugu
    // భౌగోళిక విశ్లేషణ కార్డ్ విభాగం  
"geoSpatialAnalysisCardheading": "పంటల భౌగోళిక విశ్లేషణ",  
"geoSpatialAnalysisdescription": "హీట్‌మ్యాప్స్ మరియు సీజనల్ విశ్లేషణ ద్వారా పంట నమూనాలను మరియు ఉత్పత్తి ధోరణులను అన్వేషించండి. మా వ్యవస్థ మీకు చారిత్రక పంట దిగుబడులు మరియు ప్రాంతాలను విజువలైజ్ చేయడానికి, వేర్వేరు సీజన్లలో నమూనాలను విశ్లేషించడానికి, మరియు మెరుగైన వ్యవసాయ నిర్ణయాలకు అమూల్యమైన అంతర్దృష్టులను రూపొందించడానికి అనుమతిస్తుంది. దాచిన నమూనాలను గ్రాఫికల్ ప్రాతినిధ్యాల ద్వారా కనుగొనడానికి పంట రకాలు, జిల్లాలు లేదా సీజన్లను ఎంచుకోండి.",
"geoSpatialAnalysisbutton": "భౌగోళిక విశ్లేషణను అన్వేషించండి",

"contactusheading": "మమ్మల్ని సంప్రదించండి",
"contactusdescription": "ఏదైనా సాంకేతిక సమస్య ఉందా? బీటా ఫీచర్ గురించి అభిప్రాయం పంపాలా? మా వ్యాపార ప్రణాళిక గురించి వివరాలు కావాలా? మాకు తెలియజేయండి."

    },
  },

  hi:{
    translation:{
        // FAQ translations in Hindi
      "faq.question1": "स्मार्ट सिंचाई प्रणाली क्या है?",
      "faq.answer1": "स्मार्ट सिंचाई प्रणाली एक स्वचालित समाधान है जो मिट्टी की नमी, फसल की आवश्यकताओं और मौसम की स्थिति का विश्लेषण करके पानी के उपयोग को अनुकूलित करती है। यह किसानों और मालीों को कम बर्बादी के साथ कुशल जल वितरण सुनिश्चित करने में मदद करती है।",
      "faq.question2": "सिस्टम कैसे काम करता है?",
      "faq.answer2": "हमारा सिस्टम मिट्टी की नमी और मौसम पूर्वानुमान की निगरानी के लिए सेंसर का उपयोग करता है। फसल डेटा और पूर्वनिर्धारित सीमाओं के आधार पर, यह पानी के पंप को सक्रिय या निष्क्रिय करने का निर्णय लेता है। उपयोगकर्ता क्लाउड-आधारित वेब ऐप के माध्यम से पंप की स्थिति को दूर से नियंत्रित कर सकते हैं।",
      "faq.question3": "सिस्टम किन फसलों को सपोर्ट करता है?",
      "faq.answer3": "यह सिस्टम प्रत्येक फसल की विशिष्ट पानी की आवश्यकताओं वाले डेटासेट का उपयोग करके विभिन्न फसलों को सपोर्ट करता है। बस आपकी फसल का चयन करें, और सिस्टम स्वचालित रूप से सिंचाई अनुसूची समायोजित कर देगा।",
      "faq.question4": "क्या मैं सिंचाई को दूर से नियंत्रित कर सकता हूँ?",
      "faq.answer4": "हाँ! आप हमारे वेब ऐप के माध्यम से सेंसर डेटा की निगरानी और पंप स्थिति प्रबंधित कर सकते हैं। आपको मिट्टी की स्थिति और पंप गतिविधि के रियल-टाइम अपडेट प्राप्त होंगे।",
      "faq.question5": "अनपेक्षित बारिश होने पर क्या होगा?",
      "faq.answer5": "सिस्टम वेदर API के साथ एकीकृत होकर बारिश का पूर्वानुमान लगाता है। बारिश के पूर्वानुमान होने पर यह पानी बचाने के लिए सिंचाई स्थगित या रद्द कर देगा। आप मैन्युअल ओवरराइड भी सेट कर सकते हैं।",
      "faq.question6": "मिट्टी की नमी का डेटा कितनी बार अपडेट होता है?",
      "faq.answer6": "सिस्टम मिट्टी की नमी सेंसर से डेटा रियल-टाइम या निर्धारित अंतराल पर एकत्र करता है। सटीक सिंचाई सुनिश्चित करने के लिए फसल प्रकार और खेत की स्थितियों के आधार पर आवृत्ति अनुकूलित की जा सकती है।",
      "faq.question7": "इंटरनेट कनेक्शन खोने पर क्या होगा?",
      "faq.answer7": "कनेक्टिविटी समस्याओं की स्थिति में, सिस्टम पूर्व-कॉन्फ़िगर सीमाओं और अनुसूची का उपयोग करके ऑफ़लाइन मोड में चल सकता है। कनेक्शन पुनर्स्थापित होते ही यह क्लाउड के साथ सिंक हो जाएगा।",

      // Info sections translations in Hindi
      "info.section1.title": "स्वचालित सिंचाई प्रणाली क्या है?",
      "info.section1.content1": "स्वचालित सिंचाई प्रणाली IoT-आधारित सेंसर का उपयोग कर मिट्टी की नमी की निगरानी करती है और फसलों को पानी की आपूर्ति स्वचालित करती है। यह सही समय पर सही मात्रा में पानी देकर फसल उत्पादन बढ़ाती है और जल संरक्षण करती है।",
      "info.section1.content2": "पर्यावरणीय डेटा और फसल आवश्यकताओं के विश्लेषण से यह पंप सक्रिय/निष्क्रिय कर सकती है, जिससे पानी की बर्बादी कम होती है और स्थायी कृषि को बढ़ावा मिलता है।",

      "info.section2.title": "स्मार्ट सिंचाई क्यों महत्वपूर्ण है?",
      "info.section2.content1": "कुशल सिंचाई प्रबंधन से जल खपत कम होती है और फसलों के अधिक/कम सिंचन को रोकता है।",
      "info.section2.content2": "स्मार्ट सिंचाई टिकाऊ कृषि पद्धतियों को बढ़ावा देती है, फसल स्वास्थ्य अनुकूलित करती है और संसाधन बर्बादी कम करती है।",
      "info.section2.content3": "मौसम पूर्वानुमान, फसल-विशिष्ट डेटा और मिट्टी स्वास्थ्य जानकारी को एकीकृत कर डेटा-आधारित निर्णय लेने में सक्षम बनाती है।",

      "info.section3.title": "हमारा सिस्टम कैसे काम करता है",
      "info.section3.content1": "हमारा सिस्टम मिट्टी की नमी सेंसर से डेटा एकत्र कर क्लाउड को रियल-टाइम भेजता है।",
      "info.section3.content2": "फसल-विशिष्ट डेटासेट और वेदर API का उपयोग कर नमी स्तर का विश्लेषण कर सिंचाई आवश्यकता निर्धारित करता है।",
      "info.section3.content3": "आवश्यकता होने पर सिस्टम रिमोट से मोटर सक्रिय कर सटीक मात्रा में पानी आपूर्ति करता है।",
      "info.section3.content4": "उपयोगकर्ता वेब एप्लिकेशन के माध्यम से पंप स्थिति निगरानी और सूचनाएं प्राप्त कर सकते हैं।",

      "info.section4.title": "हमारे सिस्टम की प्रमुख विशेषताएं",
      "info.section4.content1": "IoT सेंसर के साथ रियल-टाइम मिट्टी नमी निगरानी",
      "info.section4.content2": "सटीक पूर्वानुमान के लिए वेदर API एकीकरण",
      "info.section4.content3": "सिंचाई के लिए स्वचालित मोटर नियंत्रण",
      "info.section4.content4": "निगरानी और प्रबंधन के लिए उपयोगकर्ता-अनुकूल वेब इंटरफेस",
      "info.section4.content5": "इतिहास डेटा का क्लाउड संग्रहण विश्लेषण के लिए",

      "info.section5.title": "हमारे लक्ष्य",
      "info.section5.content1": "स्मार्ट सिंचाई के माध्यम से कुशल जल प्रबंधन",
      "info.section5.content2": "स्वचालित प्रणालियों के साथ फसल उत्पादन बढ़ाना",
      "info.section5.content3": "डेटा-आधारित अंतर्दृष्टि से किसानों को सहायता",
      "info.section5.content4": "टिकाऊ और संसाधन-सचेत कृषि को प्रोत्साहित करना",

      "info.section6.title": "स्मार्ट सिंचाई प्रारंभ करें",
      "info.section6.content1": "हमारी स्वचालित सिंचाई प्रणाली के साथ कुशल जल प्रबंधन की ओर अपनी यात्रा प्रारंभ करें। कुछ ही चरणों में, आप कहीं से भी सिंचाई प्रक्रिया निगरानी, नियंत्रण और अनुकूलित कर सकते हैं, जल संसाधनों के टिकाऊ उपयोग और स्वस्थ फसलों को सुनिश्चित करते हुए।",

      // HomePage texts in Hindi
      "homepage.title": "स्मार्ट सिंचाई के साथ कुशल कृषि",
      "homepage.description": "मिट्टी की स्थिति, फसल आवश्यकताओं और मौसम पूर्वानुमान का विश्लेषण करने वाली बुद्धिमान प्रणाली के साथ पानी का उपयोग अनुकूलित करें। हमारे वेब प्लेटफॉर्म के माध्यम से अपडेट रहें और सुनिश्चित करें कि आपकी फसलों को सही समय पर आवश्यक पानी मिले।",
      "homepage.getStarted": "प्रारंभ करें",
      "homepage.viewMore": "और देखें",

      // Testimonials Section in Hindi
      "testimonials.0.message": "AI-संचालित फसल सिफारिश सुविधा ने हमारे खेतों के लिए फसल चयन को पूरी तरह बदल दिया है। यह मिट्टी और मौसम के अनुकूल सही फसल लगाना सुनिश्चित करता है, जिससे बेहतर उत्पादकता और टिकाऊ कृषि होती है।",
      "testimonials.0.name": "डॉ. अर्जुन पटेल",
      "testimonials.0.role": "कृषि वैज्ञानिक",

      "testimonials.1.message": "व्यक्तिगत उर्वरक सुझावों से हमने फसल पोषण अनुकूलित किया और बर्बादी कम की। सटीक सिफारिशों ने फसल स्वास्थ्य सुधारते हुए लागत कम की है।",
      "testimonials.1.name": "प्रिया मेहता",
      "testimonials.1.role": "कृषि सलाहकार",

      "testimonials.2.message": "फसल उत्पादन भविष्यवाणी उपकरण हमारे खेत के लिए गेम-चेंजर साबित हुआ। यह संभावित उत्पादन की स्पष्ट समझ देकर कटाई योजना और संसाधन प्रबंधन में मदद करता है।",
      "testimonials.2.name": "सुरेश कुमार",
      "testimonials.2.role": "खेत प्रबंधक",

      "testimonials.3.message": "मौसम डेटा, फसल सिफारिशों और सिंचाई नियंत्रण का संयोजन हमारे गाँव की कृषि को बहुत लाभ पहुँचाया है। यह प्लेटफॉर्म सभी जानकारी एक स्थान पर प्रदान करता है।",
      "testimonials.3.name": "अंजलि सिंह",
      "testimonials.3.role": "स्थानीय सरकारी अधिकारी",

      "testimonials.4.message": "सिस्टम की AI-आधारित अंतर्दृष्टि ने हमारे क्षेत्र की विभिन्न मिट्टी स्थितियों के लिए उपयुक्त फसलों की पहचान में महत्वपूर्ण भूमिका निभाई है। इसने किसानों को बेहतर रोपण निर्णय लेने में सक्षम बनाया है।",
      "testimonials.4.name": "राहुल देशाई",
      "testimonials.4.role": "मृदा वैज्ञानिक",

      "testimonials.5.message": "इस प्लेटफॉर्म का उपयोग शुरू करने के बाद से मेरे खेत का उत्पादन काफी बढ़ गया है। फसल सिफारिश और सिंचाई नियंत्रण उपकरणों ने अनिश्चितता दूर कर सब कुछ अधिक कुशल बना दिया है।",
      "testimonials.5.name": "रवि शर्मा",
      "testimonials.5.role": "किसान",

      // Features Card Section in Hindi
      "featureCardheading": "हमारी विशेषताएं जानें",
      "featureCarddescription":"जानें कि हमारी स्मार्ट सिंचाई प्रणाली कैसे किसानों को रियल-टाइम डेटा और बुद्धिमान स्वचालन के साथ कुशल जल प्रबंधन में सशक्त बनाती है।",

      "featuresCard.title1": "फसल सिफारिश",
      "featuresCard.description1": "मिट्टी प्रकार और क्षेत्र-विशिष्ट मौसम के आधार पर उपयुक्त फसलों की सिफारिश करता है",

      "featuresCard.title2": "PestPedia",
      "featuresCard.description2": "कीटों की पहचान, उनके प्रभाव और उपयुक्त कीटनाशकों की जानकारी प्रदान करता है।",

      "featuresCard.title3": "फसल परिवर्तन एवं अनुकूलन",
      "featuresCard.description3": "स्थान और वास्तविक समय के मौसम अपडेट के आधार पर फसल उत्पादन और उपज की भविष्यवाणी करें। बेहतर उत्पादकता और स्थिरता के लिए फसल चयन को अनुकूलित करें।",

      "featuresCard.title4": "फसल बाजार प्रवृत्ति विश्लेषक",
      "featuresCard.description4": "बाजार में फसलों और सब्जियों के मूल्यों का विश्लेषण कर किसानों के लाभ को अनुकूलित करने हेतु सुझाव प्रदान करता है",

      // Features Section
    "featureheading": "हमारी विशेषताएँ",
    "featuredescription": "हमारी स्मार्ट सिंचाई प्रणाली की मुख्य विशेषताओं को जानें जो जल प्रबंधन को कुशल बनाती हैं और टिकाऊ कृषि को बढ़ावा देती हैं।",

    "feature1title":"रियल-टाइम मिट्टी निगरानी",
    "feature1description":"फसलों के लिए आदर्श विकास स्थितियाँ बनाए रखने हेतु मिट्टी की नमी को रियल-टाइम ट्रैक करें।",
    
    "feature2title":"स्मार्ट स्वचालित सिंचाई",
    "feature2description":"रियल-टाइम सेंसर रीडिंग और फसल आवश्यकताओं के आधार पर पानी के पंपों को स्वचालित रूप से नियंत्रित करें।",
    
    "feature3title":"अधिकतम जल दक्षता",
    "feature3description":"टिकाऊ कृषि और स्वस्थ फसलों को सुनिश्चित करते हुए पानी की बर्बादी कम करने के लिए भविष्यकथी विश्लेषण का उपयोग करें।",
    
    "feature4title":"मौसम-अनुकूल सिंचाई",
    "feature4description":"वर्षा से पहले पानी बचाने के लिए मौसम पूर्वानुमान के साथ सिंचाई अनुसूची को गतिशील रूप से समायोजित करें।",

    // Map Card Section
    "mapCardheading": "स्मार्ट सिंचाई क्यों महत्वपूर्ण है?",
    "mapCarddescription1": "पानी के उपयोग को अनुकूलित करने और बर्बादी कम करने के लिए मिट्टी की नमी की रियल-टाइम निगरानी करें।",
    "mapCarddescription2": "सिंचाई आवश्यकताओं का सटीक अनुमान लगाने के लिए भौगोलिक स्थान और मौसम डेटा का उपयोग करें।",
    "mapCarddescription3": "क्लाउड नियंत्रण के माध्यम से पानी के पंपों को स्वचालित करें, फसलों को सही समय पर पानी मिले।",

    // Optimal Crop Season Card Section
    "optimalCropSeasonCardheading": "इष्टतम फसल मौसम भविष्यवक्ता",
    "optimalCropSeasonCarddescription": "यह बुद्धिमान उपकरण उपयोगकर्ताओं को विशिष्ट फसलों के लिए आदर्श मौसम निर्धारित करने में सहायक है। यह फसल वर्ष, फसल प्रकार और राज्य सहित विभिन्न कारकों का विश्लेषण कर सटीक सिफारिशें प्रदान करता है, जिससे किसान न्यूनतम जल और संसाधन उपयोग के साथ उत्तम उत्पादन प्राप्त कर सकें।",
    "optimalCropSeasonCardbutton":"इष्टतम फसल मौसम खोजें",

    // GeoSpatial Analysis Card Section
    "geoSpatialAnalysisCardheading": "फसलों का भौगोलिक विश्लेषण",
    "geoSpatialAnalysisdescription":"हीटमैप्स और मौसमी विश्लेषण के साथ फसल पैटर्न और उत्पादन प्रवृत्तियों का अन्वेषण करें। हमारी प्रणाली ऐतिहासिक फसल उत्पादन और क्षेत्रों को विज़ुअलाइज़ करने, विभिन्न मौसमों में पैटर्न विश्लेषण करने, और बेहतर कृषि निर्णयों के लिए अंतर्दृष्टि उत्पन्न करने में सक्षम बनाती है। फसल प्रकार, जिलों या मौसमों का चयन कर दृश्य प्रस्तुतियों के माध्यम से छिपे पैटर्न खोजें।",
    "geoSpatialAnalysisbutton":"भौगोलिक विश्लेषण शुरू करें",

    // Contact Us Section
    "contactusheading": "संपर्क करें",
"contactusdescription": "कोई तकनीकी समस्या है? किसी बीटा फीचर के बारे में प्रतिक्रिया भेजना चाहते हैं? हमारे बिजनेस प्लान के बारे में जानकारी चाहिए? हमें बताएं।"

    }
  }
  // Add more languages as needed...
};

i18n
  .use(LanguageDetector) // Automatically detects user language
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en', // Fallback to English if language detection fails
    interpolation: {
      escapeValue: false, // React handles escaping
    },
  });

export default i18n;
