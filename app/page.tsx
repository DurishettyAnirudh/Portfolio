"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ContactForm } from "@/components/contact-form"
import { AnimatedSection } from "@/components/animated-section"
import { FloatingElements } from "@/components/floating-elements"
import { ScrollProgress } from "@/components/scroll-progress"
import { getSkills, getProjects, getCertifications, getAchievements } from "@/lib/admin-actions"
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  ExternalLink,
  Download,
  Code,
  Database,
  Brain,
  Award,
  GraduationCap,
  Calendar,
  Star,
  ChevronDown,
  Menu,
  X,
  Sparkles,
  Trophy,
} from "lucide-react"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  const [skills, setSkills] = useState([])
  const [projects, setProjects] = useState([])
  const [certifications, setCertifications] = useState([])
  const [achievements, setAchievements] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [skillsData, projectsData, certificationsData, achievementsData] = await Promise.all([
          getSkills(),
          getProjects(),
          getCertifications(),
          getAchievements(),
        ])

        setSkills(skillsData)
        setProjects(projectsData)
        setCertifications(certificationsData)
        setAchievements(achievementsData)
      } catch (error) {
        console.error("Error fetching data:", error)
        // Fallback to hardcoded data if database fetch fails
        setSkills([
          { category: "Programming Languages", skills: ["Python", "Java"], icon: "Code" },
          { category: "Web Development", skills: ["HTML", "CSS", "SpringBoot"], icon: "Code" },
          {
            category: "ML/Data Science",
            skills: ["numpy", "pandas", "scikit-learn", "matplotlib", "seaborn", "streamlit"],
            icon: "Brain",
          },
          { category: "Databases", skills: ["MySQL", "MongoDB"], icon: "Database" },
          {
            category: "Tools & Software",
            skills: ["Tableau", "Git", "Jupyter", "VS Code", "Eclipse", "IntelliJ IDEA"],
            icon: "Code",
          },
        ])
        setProjects([
          {
            title: "Intruder Alert System",
            date: "06/2024",
            technologies: ["Python", "OpenCV", "smtplib", "Windows Logs"],
            description:
              "Developed a Python-based security system that activates when Windows is locked, monitoring system logs for incorrect password attempts.",
            features: [
              "Automated alert system with email notifications",
              "Captures intruder images",
              "Enhanced personal security monitoring",
            ],
            link: "#",
          },
          {
            title: "AI powered Content Creation Bot",
            date: "11/2024",
            technologies: ["Python", "Streamlit", "EdgeTTS", "Whisper"],
            description:
              "Built an AI-powered bot that automates social media content generation by streamlining script writing, voiceovers, captioning, and video assembly.",
            features: [
              "ChatGPT integration for script generation",
              "EdgeTTS for voiceovers",
              "Whisper for captioning",
              "Fully automated workflow",
            ],
            link: "#",
          },
        ])
        setCertifications([
          {
            name: "Oracle Cloud Infrastructure 2024 Generative AI Certified Professional",
            issuer: "Oracle University",
            date: "07/2024",
          },
          {
            name: "Oracle Cloud Infrastructure 2024 Certified Data Science Professional",
            issuer: "Oracle University",
            date: "09/2024",
          },
          { name: "AWS Academy Machine Learning Foundations", issuer: "AWS Academy", date: "02/2025" },
          { name: "Data Fundamentals", issuer: "IBM SkillsBuild", date: "02/2025" },
          { name: "Prompt Design in Vertex AI Skill Badge", issuer: "Google Cloud", date: "10/2024" },
          { name: "Develop GenAI Apps with Gemini and Streamlit Skill Badge", issuer: "Google Cloud", date: "10/2024" },
          { name: "JobReady Employability Skills", issuer: "Wadhwani Foundation", date: "06/2024" },
          { name: "Cambridge English Empower Level C1 Course", issuer: "Cambridge", date: "09/2023" },
        ])
        setAchievements([
          {
            title: "Top 5% in Adobe GenSolve",
            description:
              "Ranked in the top 5% in Adobe GenSolve, hosted by Adobe and GeeksforGeeks, nationwide. (07/2024)",
            date: "07/2024",
            icon: "Star",
          },
          {
            title: "CTF Qualification",
            description: "Qualified for CTF round (Penetration testing) for Great AppSec Hackathon.",
            date: "05/2024",
            icon: "Award",
          },
          {
            title: "Student Coordinator",
            description: "Student Coordinator Avishkar 2023 Techno Fest. (01/2023)",
            date: "01/2023",
            icon: "GraduationCap",
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "skills", "education", "projects", "certifications", "achievements", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetBottom = offsetTop + element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  const navigationItems = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "education", label: "Education" },
    { id: "projects", label: "Projects" },
    { id: "certifications", label: "Certifications" },
    { id: "achievements", label: "Achievements" },
    { id: "contact", label: "Contact" },
  ]

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Code":
        return Code
      case "Database":
        return Database
      case "Brain":
        return Brain
      case "Star":
        return Star
      case "Award":
        return Award
      case "GraduationCap":
        return GraduationCap
      case "Trophy":
        return Trophy
      case "Calendar":
        return Calendar
      default:
        return Code
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading portfolio...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 relative overflow-x-hidden">
      <ScrollProgress />
      <FloatingElements />

      {/* Cursor follower */}
      <div
        className="fixed w-4 h-4 bg-emerald-400 rounded-full pointer-events-none z-50 opacity-50 transition-all duration-300 ease-out"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
          transform: "scale(0.8)",
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Anirudh Durishetty
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-all duration-300 hover:text-emerald-600 relative ${
                    activeSection === item.id ? "text-emerald-600" : "text-gray-700"
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full" />
                  )}
                </button>
              ))}
            </div>

            {/* Mobile Navigation Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200/50 bg-white/90 backdrop-blur-xl">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50/50 transition-all duration-200"
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="pt-16 min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background with parallax effect */}
        <div
          className="absolute inset-0 z-0"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-teal-900/10 to-transparent z-10" />
          <Image
            src="/images/profile-background.jpg"
            alt="Anirudh Durishetty Background"
            fill
            className="object-cover object-center opacity-10"
            priority
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-20">
          <AnimatedSection className="text-center">
            <div className="mb-8">
              {/* Profile Picture with enhanced styling */}
              <div className="relative w-40 h-40 mx-auto mb-8">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-teal-500 to-emerald-600 rounded-full animate-pulse opacity-75"></div>
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-2xl transform hover:scale-105 transition-all duration-500">
                  <Image
                    src="/images/profile-headshot.jpg"
                    alt="Anirudh Durishetty"
                    fill
                    className="object-cover object-center"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                </div>
                <Sparkles className="absolute -top-2 -right-2 h-8 w-8 text-yellow-400 animate-pulse" />
                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
              </div>

              <AnimatedSection delay={200}>
                <h1 className="text-4xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 via-emerald-800 to-teal-800 bg-clip-text text-transparent mb-4 leading-tight">
                  Durishetty Anirudh
                </h1>
              </AnimatedSection>

              <AnimatedSection delay={400}>
                <p className="text-xl md:text-3xl text-gray-600 mb-6 font-medium">
                  Data Science & AI Enthusiast | Backend Developer
                </p>
              </AnimatedSection>

              <AnimatedSection delay={600}>
                <p className="text-lg text-gray-500 max-w-4xl mx-auto mb-8 leading-relaxed">
                  Aspiring tech professional with expertise in Data Science, Machine Learning, Generative AI, and Web
                  Development. Passionate about building AI-powered solutions and leveraging data for meaningful
                  insights.
                </p>
              </AnimatedSection>
            </div>

            <AnimatedSection delay={800}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  onClick={() => scrollToSection("contact")}
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Get In Touch
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white px-8 py-4 rounded-xl font-medium transform hover:scale-105 transition-all duration-300"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download Resume
                </Button>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={1000}>
              <div className="flex justify-center space-x-8">
                <a
                  href="mailto:anirudhdurishetty@gmail.com"
                  className="text-gray-600 hover:text-emerald-600 transition-all duration-300 transform hover:scale-110"
                >
                  <Mail className="h-8 w-8" />
                </a>
                <a
                  href="tel:+919492557005"
                  className="text-gray-600 hover:text-emerald-600 transition-all duration-300 transform hover:scale-110"
                >
                  <Phone className="h-8 w-8" />
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-emerald-600 transition-all duration-300 transform hover:scale-110"
                >
                  <Linkedin className="h-8 w-8" />
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-emerald-600 transition-all duration-300 transform hover:scale-110"
                >
                  <Github className="h-8 w-8" />
                </a>
              </div>
            </AnimatedSection>
          </AnimatedSection>

          <AnimatedSection delay={1200} className="text-center mt-16">
            <ChevronDown className="h-8 w-8 mx-auto text-gray-400 animate-bounce" />
          </AnimatedSection>
        </div>
      </section>

      {/* About Section with Background Image */}
      <section id="about" className="py-20 relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-white/95 z-10" />
          <Image
            src="/images/profile-background.jpg"
            alt="Background"
            fill
            className="object-cover object-center opacity-20"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-emerald-800 bg-clip-text text-transparent mb-4">
              About Me
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              A passionate Computer Science student with a strong foundation in cutting-edge technologies
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="left">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Professional Summary</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  I'm an aspiring tech professional with a strong foundation in Data Science, Machine Learning,
                  Generative AI, and Web Development. My expertise lies in building AI-powered solutions, developing
                  scalable backend systems, and leveraging Big Data for data-driven decision-making.
                </p>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  I have hands-on experience in creating automation tools, content generation systems, and experimenting
                  with RAG systems and Transformers. I'm actively seeking opportunities to apply my skills in Data
                  Science or Backend Java Development to help organizations automate processes and unlock valuable
                  insights from their data.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center group">
                    <MapPin className="h-5 w-5 text-emerald-600 mr-3 group-hover:scale-110 transition-transform" />
                    <span className="text-gray-700">Hyderabad, Telangana</span>
                  </div>
                  <div className="flex items-center group">
                    <Mail className="h-5 w-5 text-emerald-600 mr-3 group-hover:scale-110 transition-transform" />
                    <span className="text-gray-700">anirudhdurishetty@gmail.com</span>
                  </div>
                  <div className="flex items-center group">
                    <Phone className="h-5 w-5 text-emerald-600 mr-3 group-hover:scale-110 transition-transform" />
                    <span className="text-gray-700">+91 9492557005</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Soft Skills</h3>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {["Patience", "Leadership", "Problem-solving", "Communication", "Teamwork", "Individual work"].map(
                    (skill, index) => (
                      <AnimatedSection key={skill} delay={index * 100}>
                        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 text-center border border-emerald-100 hover:shadow-md transition-all duration-300 transform hover:scale-105">
                          <span className="text-gray-700 font-medium">{skill}</span>
                        </div>
                      </AnimatedSection>
                    ),
                  )}
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Languages</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">English</span>
                      <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
                        Professional Proficiency
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Telugu</span>
                      <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">Native</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Hindi</span>
                      <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">Intermediate</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-emerald-800 bg-clip-text text-transparent mb-4">
              Technical Skills
            </h2>
            <p className="text-lg text-gray-600">Technologies and tools I work with</p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((category, index) => {
              const IconComponent = getIcon(category.icon)
              return (
                <AnimatedSection key={index} delay={index * 200}>
                  <Card className="hover:shadow-2xl transition-all duration-500 transform hover:scale-105 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <div className="p-2 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-lg mr-3">
                          <IconComponent className="h-6 w-6 text-emerald-600" />
                        </div>
                        {category.category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill, skillIndex) => (
                          <AnimatedSection key={skill} delay={skillIndex * 50}>
                            <Badge
                              variant="outline"
                              className="bg-white border-emerald-200 text-emerald-700 hover:bg-emerald-50 transition-colors cursor-default"
                            >
                              {skill}
                            </Badge>
                          </AnimatedSection>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-emerald-800 bg-clip-text text-transparent mb-4">
              Education
            </h2>
            <p className="text-lg text-gray-600">Academic background and achievements</p>
          </AnimatedSection>

          <div className="space-y-8">
            <AnimatedSection>
              <Card className="hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center text-xl">
                        <div className="p-2 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-lg mr-3">
                          <GraduationCap className="h-6 w-6 text-emerald-600" />
                        </div>
                        Bachelor of Technology in Computer Science and Engineering
                      </CardTitle>
                      <CardDescription className="mt-2 text-base">
                        Malla Reddy College of Engineering and Technology
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 border-emerald-200 text-sm px-3 py-1">
                        CGPA: 8.90/10.0
                      </Badge>
                      <p className="text-sm text-gray-500 mt-1">2022 - Present</p>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <Card className="hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">Intermediate MPC</CardTitle>
                      <CardDescription className="mt-2 text-base">
                        Telangana State Residential Junior College, Sarvail
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 border-emerald-200 text-sm px-3 py-1">
                        94%
                      </Badge>
                      <p className="text-sm text-gray-500 mt-1">2020 - 2022</p>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </AnimatedSection>

            <AnimatedSection delay={400}>
              <Card className="hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">10th Standard (SSC)</CardTitle>
                      <CardDescription className="mt-2 text-base">India Mission Secondary School</CardDescription>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 border-emerald-200 text-sm px-3 py-1">
                        CGPA: 10/10
                      </Badge>
                      <p className="text-sm text-gray-500 mt-1">2019 - 2020</p>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-emerald-800 bg-clip-text text-transparent mb-4">
              Projects
            </h2>
            <p className="text-lg text-gray-600">Some of my notable work and contributions</p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <AnimatedSection key={index} delay={index * 300}>
                <Card className="hover:shadow-2xl transition-all duration-500 transform hover:scale-105 bg-white/80 backdrop-blur-sm border-0 shadow-lg h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-xl bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
                        {project.title}
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-500">{project.date}</span>
                      </div>
                    </div>
                    <CardDescription className="mt-2 text-base leading-relaxed">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Technologies Used:</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, techIndex) => (
                            <AnimatedSection key={tech} delay={techIndex * 50}>
                              <Badge
                                variant="outline"
                                className="bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200 text-emerald-700"
                              >
                                {tech}
                              </Badge>
                            </AnimatedSection>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                        <ul className="list-disc list-inside space-y-2 text-gray-600">
                          {project.features.map((feature, idx) => (
                            <li key={idx} className="leading-relaxed">
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button
                        variant="outline"
                        className="w-full border-emerald-200 text-emerald-700 hover:bg-emerald-50 transition-all duration-300 transform hover:scale-105"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Project
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-emerald-800 bg-clip-text text-transparent mb-4">
              Certifications
            </h2>
            <p className="text-lg text-gray-600">Professional certifications and credentials</p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <Card className="hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-start justify-between">
                      <span className="text-lg leading-tight pr-4">{cert.name}</span>
                      <div className="p-2 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-lg flex-shrink-0">
                        <Award className="h-5 w-5 text-emerald-600" />
                      </div>
                    </CardTitle>
                    <CardDescription>
                      <div className="flex justify-between items-center mt-3">
                        <span className="text-base">{cert.issuer}</span>
                        <Badge className="bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 border-emerald-200">
                          {cert.date}
                        </Badge>
                      </div>
                    </CardDescription>
                  </CardHeader>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-emerald-800 bg-clip-text text-transparent mb-4">
              Achievements & Activities
            </h2>
            <p className="text-lg text-gray-600">Recognition and notable accomplishments</p>
          </AnimatedSection>

          <div className="space-y-6">
            {achievements.map((achievement, index) => {
              const IconComponent = getIcon(achievement.icon)
              return (
                <AnimatedSection key={index} delay={index * 200}>
                  <Card className="hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center text-xl">
                        <div className="p-2 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-lg mr-3">
                          <IconComponent className="h-6 w-6 text-yellow-600" />
                        </div>
                        {achievement.title}
                      </CardTitle>
                      <CardDescription className="text-base">{achievement.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-emerald-800 bg-clip-text text-transparent mb-4">
              Get In Touch
            </h2>
            <p className="text-lg text-gray-600">Let's connect and discuss opportunities</p>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <AnimatedSection direction="left">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-center group">
                    <div className="p-3 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-lg mr-4 group-hover:scale-110 transition-transform">
                      <Mail className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Email</p>
                      <a href="mailto:anirudhdurishetty@gmail.com" className="text-emerald-600 hover:underline">
                        anirudhdurishetty@gmail.com
                      </a>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center group">
                    <div className="p-3 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-lg mr-4 group-hover:scale-110 transition-transform">
                      <Phone className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Phone</p>
                      <a href="tel:+919492557005" className="text-emerald-600 hover:underline">
                        +91 9492557005
                      </a>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center group">
                    <div className="p-3 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-lg mr-4 group-hover:scale-110 transition-transform">
                      <MapPin className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Location</p>
                      <p className="text-gray-600">Hyderabad, Telangana</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-center space-x-6 pt-4">
                    <a
                      href="#"
                      className="p-3 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-lg text-emerald-600 hover:scale-110 transition-all duration-300"
                    >
                      <Linkedin className="h-6 w-6" />
                    </a>
                    <a
                      href="#"
                      className="p-3 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-lg text-emerald-600 hover:scale-110 transition-all duration-300"
                    >
                      <Github className="h-6 w-6" />
                    </a>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <ContactForm />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-emerald-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-300 text-lg">© 2024 Durishetty Anirudh. All rights reserved.</p>
            <p className="text-gray-400 mt-2">Built with passion and cutting-edge technology</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
