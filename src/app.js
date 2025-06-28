const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path'); // ✅ Added this line
const app = express();
require('./config/database');

const aboutCta = require('./routes/about/aboutCta.js')
const ctaRoutes = require('./routes/home/CTARoutes.js'); 
const statsRoutes = require('./routes/home/statsRoutes.js')
const causesRoutes = require('./routes/home/causesRoutes.js')
const authRoutes = require('./routes/auth/authRoutes.js');
const eventsRoutes = require('./routes/home/eventsRoutes.js')
const activityRoutes = require('./routes/home/activitiesRoutes.js')
const impactRoutes = require('./routes/home/impactRoutes.js');
const volunteerManagementRoutes = require('./routes/home/volunteer.js')
const heroSection = require('./routes/home/heroSection.js')
const testimonial = require('./routes/home/testimonial.js')
const newsletterRoutes = require('./routes/home/newsletter.js')
const eventRoutes = require('./routes/event/eventPage.js');
const eventFilter = require('./routes/event/eventFilter.js')
const aboutChoose = require('./routes/about/aboutChoose.js')
const timelineRoutes = require('./routes/about/timeline.js');
const mission = require('./routes/about/mission.js');
const aboutHero = require('./routes/about/aboutHero.js')
const teamRoutes = require('./routes/about/aboutTeam.js');
const causeHero = require('./routes/cause/causeHero.js')
const causeImpact = require('./routes/cause/causeImpact.js')
const projectRoutes = require('./routes/cause/projects.js');
const sectionRoutes = require('./routes/cause/sectionSetting.js');
const causecta = require('./routes/cause/causeCta.js');
const causeList = require('./routes/cause/causeList.js');
const news = require('./routes/cause/new.js')
const FAQ = require('./routes/volunteer/vFaq.js')
const vhero = require('./routes/volunteer/vhero.js')
const eventHero = require('./routes/event/eventHero.js');
const vimpact = require('./routes/volunteer/vimpact.js')
const vtrust = require('./routes/volunteer/vTrust.js')
const vrole = require('./routes/volunteer/vrole.js')
const vtest = require('./routes/volunteer/vtest.js')
const vWhy = require('./routes/volunteer/vWhy.js')
const vsignup = require('./routes/volunteer/vsignup.js')
const vvolun = require('./routes/volunteer/vvolun.js')

// Middleware
app.use(helmet());

app.use(cors({
  origin:'*',
  credentials: true,
}));


console.log("🚀 Backend server initialized...");
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/api/health', (req, res) => {
  console.log("✅ Health check endpoint hit");
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Frontend connection test endpoint
app.get('/api/test-connection', (req, res) => {
  console.log("🔗 Frontend connection test received");
  res.json({ message: 'Frontend successfully connected to backend!' });
});

// In your Express server setup
// Static uploads route
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/auth', authRoutes);

app.use('/api/cta', ctaRoutes);
app.use('/api/stat',statsRoutes);
app.use('/api/causes',causesRoutes)
app.use('/api', eventsRoutes); 
app.use('/api/activities', activityRoutes);
app.use('/api/impact', impactRoutes);
app.use('/api', volunteerManagementRoutes);
app.use('/api/hero', heroSection);
app.use('/api/test',testimonial)
app.use('/api', newsletterRoutes);


app.use('/api/events', eventRoutes);
app.use('/api/filter',eventFilter);

app.use('/api/aboutcta',aboutCta)
app.use('/api/choose',aboutChoose)
app.use('/api/timeline', timelineRoutes);
app.use('/api/mission', mission);
app.use('/api/aboutHero', aboutHero);
app.use('/api/team', teamRoutes);
app.use('/api/causeHero',causeHero)
app.use('/api/causeImpact',causeImpact)
app.use('/api/transform-projects', projectRoutes);
app.use('/api/transform-section-settings', sectionRoutes);
app.use('/api/causecta', causecta);
app.use('/api/causeList', causeList);
app.use('/api/new',news);
app.use('/api/faq',FAQ);
app.use('/api/vhero',vhero)
app.use('/api/eventHero',eventHero)
app.use('/api/vimpact',vimpact)
app.use('/api/vtrust',vtrust)
app.use('/api/vrole',vrole)
app.use('/api/vtest',vtest);
app.use('/api/vWhy',vWhy)
app.use('/api/vsignup',vsignup);
app.use('/api/vvolun',vvolun)

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('❌ Unhandled error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

module.exports = app;
