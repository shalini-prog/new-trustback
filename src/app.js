const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path'); // ✅ Added this line
const app = express();
require('./config/database');

const aboutCta = require('./routes/aboutCta.js')
const ctaRoutes = require('./routes/CTARoutes.js'); 
const statsRoutes = require('./routes/statsRoutes.js')
const causesRoutes = require('./routes/causesRoutes.js')
const authRoutes = require('./routes/authRoutes.js');
const eventsRoutes = require('./routes/eventsRoutes.js')
const activityRoutes = require('./routes/activitiesRoutes.js')
const impactRoutes = require('./routes/impactRoutes.js');
const volunteerManagementRoutes = require('./routes/volunteer.js')
const heroSection = require('./routes/heroSection.js')
const testimonial = require('./routes/testimonial.js')
const newsletterRoutes = require('./routes/newsletter.js')
const eventRoutes = require('./routes/eventPage.js');
const eventFilter = require('./routes/eventFilter.js')
const aboutChoose = require('./routes/aboutChoose.js')
const timelineRoutes = require('./routes/timeline.js');
const mission = require('./routes/mission.js');
const aboutHero = require('./routes/aboutHero.js')
const teamRoutes = require('./routes/aboutTeam.js');
const causeHero = require('./routes/causeHero.js')
const causeImpact = require('./routes/causeImpact.js')
const projectRoutes = require('./routes/projects.js');
const sectionRoutes = require('./routes/sectionSetting.js');
const causecta = require('./routes/causeCta.js');
const causeList = require('./routes/causeList.js');
const news = require('./routes/new.js')
const FAQ = require('./routes/vFaq.js')
const vhero = require('./routes/vhero.js')
const eventHero = require('./routes/eventHero.js');
const vimpact = require('./routes/vimpact.js')

const vrole = require('./routes/vrole.js')
const vtest = require('./routes/vtest.js')
const vWhy = require('./routes/vWhy.js')
const vsignup = require('./routes/vsignup.js')

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
app.use('/api/stat', statsRoutes);
app.use('/api/causes', causesRoutes); // ✅ Now actively used
app.use('/api/filter',eventFilter)
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

app.use('/api/vrole',vrole)
app.use('/api/vtest',vtest);
app.use('/api/vWhy',vWhy)
app.use('/api/vsignup',vsignup);

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
