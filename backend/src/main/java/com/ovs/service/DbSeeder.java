package com.ovs.service;

import com.ovs.entity.*;
import com.ovs.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.transaction.annotation.Transactional;

@Component
public class DbSeeder implements CommandLineRunner {

    private final AdminRepository adminRepository;
    private final CategoryRepository categoryRepository;
    private final ServiceRepository serviceRepository;
    private final ProjectRepository projectRepository;
    private final GalleryRepository galleryRepository;
    private final TestimonialRepository testimonialRepository;
    private final WebsiteSettingRepository websiteSettingRepository;
    private final PasswordEncoder passwordEncoder;

    public DbSeeder(AdminRepository adminRepository,
                    CategoryRepository categoryRepository,
                    ServiceRepository serviceRepository,
                    ProjectRepository projectRepository,
                    GalleryRepository galleryRepository,
                    TestimonialRepository testimonialRepository,
                    WebsiteSettingRepository websiteSettingRepository,
                    PasswordEncoder passwordEncoder) {
        this.adminRepository = adminRepository;
        this.categoryRepository = categoryRepository;
        this.serviceRepository = serviceRepository;
        this.projectRepository = projectRepository;
        this.galleryRepository = galleryRepository;
        this.testimonialRepository = testimonialRepository;
        this.websiteSettingRepository = websiteSettingRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        seedAdmin();
        seedCategoriesAndServices();
        seedWebsiteSettings();
        seedTestimonials();
        seedProjectsAndGallery();
    }

    private void seedAdmin() {
        if (adminRepository.count() == 0) {
            Admin admin = Admin.builder()
                    .username("admin")
                    .password(passwordEncoder.encode("admin123"))
                    .email("onevendorsolutions@gmail.com")
                    .fullName("OVS Admin")
                    .build();
            adminRepository.save(admin);
            System.out.println("Seeded default admin user: username=admin, password=admin123");
        }
    }

    private String getServiceImage(String sName, String catName) {
        String name = sName.toLowerCase().trim();
        String cat = catName.toLowerCase().trim();
        
        // School Essentials
        if (cat.contains("school")) {
            if (name.contains("computer lab") || name.contains("science lab")) {
                return "/all-images/school/school labs.png";
            } else if (name.contains("interactive") || name.contains("smart class")) {
                return "/all-images/school/smart class.jpg";
            } else if (name.contains("projector")) {
                return "/all-images/school/projector.png";
            } else if (name.contains("furniture") || name.contains("bench") || name.contains("desk")) {
                return "/all-images/school/desk.png";
            } else if (name.contains("library")) {
                return "/all-images/school/library.png";
            } else if (name.contains("whiteboard")) {
                return "/all-images/school/white-board.png";
            } else if (name.contains("locker") || name.contains("storage") || name.contains("almirah")) {
                return "/all-images/school/Plastic-School-Locker-for-Student-or-Teachers-Storage.jpg";
            } else if (name.contains("electrical") || name.contains("cctv")) {
                return "/all-images/office/electronic-eesential-office.png";
            } else if (name.contains("plumbing")) {
                return "/all-images/school/Plumbing-work.jpg";
            } else if (name.contains("painting")) {
                return "/all-images/Onevendorsolutions/0204d1cf44349b83739d09a77531a49b.jpg";
            } else if (name.contains("curtains")) {
                return "/all-images/Onevendorsolutions/122ddd10cc59750e4f57c2c9749fbfa9.jpg";
            } else if (name.contains("fire")) {
                return "/all-images/Onevendorsolutions/school-office-coahing.jpg";
            }
        }
        
        // Home Services
        if (cat.contains("home")) {
            if (name.contains("interior")) {
                return "/all-images/Onevendorsolutions/6ddfc4099d32892d30cbeceecf947e64.jpg";
            } else if (name.contains("furniture")) {
                return "/all-images/Onevendorsolutions/home-office.png";
            } else if (name.contains("kitchen")) {
                return "/all-images/Onevendorsolutions/Simple Kitchen design with a matte finish cabinets.webp";
            } else if (name.contains("bathroom") || name.contains("plumbing")) {
                return "/all-images/Onevendorsolutions/pipe-connections-or-plumbing-work-in-bathroom-washroom-construction-site-of-a-building-a-house-or-villa-or-apartment-kerala-india-2DDXGN3.jpg";
            } else if (name.contains("tiles") || name.contains("granite")) {
                return "/all-images/Onevendorsolutions/3281cdad-7680-44f6-a077-64ef4ea14e3a.png";
            } else if (name.contains("painting")) {
                return "/all-images/Onevendorsolutions/0204d1cf44349b83739d09a77531a49b.jpg";
            } else if (name.contains("electrical")) {
                return "/all-images/Onevendorsolutions/ki-19-1763112250-yxqtA.jpg";
            } else if (name.contains("ceiling")) {
                return "/all-images/Onevendorsolutions/a158d266deaa2985ed633b40c527e99d.jpg";
            } else if (name.contains("renovation")) {
                return "/all-images/Onevendorsolutions/ki-51-1778755285-5IMEw.jpg";
            }
        }
        
        // Office Requirements
        if (cat.contains("office")) {
            if (name.contains("furniture") || name.contains("desk") || name.contains("table")) {
                return "/all-images/Onevendorsolutions/office-desk.jpg";
            } else if (name.contains("conference") || name.contains("seating")) {
                return "/all-images/school/seating-chair.png";
            } else if (name.contains("storage") || name.contains("almirah") || name.contains("locker")) {
                return "/all-images/school/storage-almirah.png";
            } else if (name.contains("networking") || name.contains("electrical") || name.contains("cctv")) {
                return "/all-images/office/electronic-eesential-office.png";
            } else if (name.contains("interior")) {
                return "/all-images/Onevendorsolutions/office-desk.jpg";
            } else if (name.contains("amc") || name.contains("fire")) {
                return "/all-images/Onevendorsolutions/school-office-coahing.jpg";
            }
        }

        // Coaching Classes
        if (cat.contains("coaching")) {
            if (name.contains("furniture") || name.contains("bench") || name.contains("desk")) {
                return "/all-images/school/classroom-bench'.png";
            } else if (name.contains("whiteboard")) {
                return "/all-images/school/white-board.png";
            } else if (name.contains("projector")) {
                return "/all-images/school/projector.png";
            } else if (name.contains("computer")) {
                return "/all-images/school/school labs.png";
            } else if (name.contains("interior")) {
                return "/all-images/Onevendorsolutions/office-desk.jpg";
            } else if (name.contains("electrical") || name.contains("cctv")) {
                return "/all-images/office/electronic-eesential-office.png";
            } else if (name.contains("fire") || name.contains("safety")) {
                return "/all-images/Onevendorsolutions/school-office-coahing.jpg";
            }
        }

        return "/all-images/Onevendorsolutions/school-office-coahing.jpg";
    }

    private void seedCategoriesAndServices() {
        if (categoryRepository.count() == 0) {
            // 1. School Essentials
            Category school = Category.builder()
                    .name("School Essentials")
                    .description("Uniforms, smart classrooms, lab setups, library setups, and security installations for educational institutions.")
                    .imageUrl("/all-images/Onevendorsolutions/school-office-coahing.jpg")
                    .build();
            school = categoryRepository.save(school);

            // Services for School
            String[] schoolServices = {
                    "Computer Lab Setup", "Science Lab", "Interactive Panels", "Projectors",
                    "Furniture", "Library Setup", "Smart Classroom", "Electrical Work",
                    "Fire Safety", "CCTV", "Painting", "Curtains", "Plumbing"
            };
            for (String sName : schoolServices) {
                serviceRepository.save(ServiceEntity.builder()
                        .name(sName)
                        .description("Premium " + sName + " designed and installed to meet national school board standards.")
                        .imageUrl(getServiceImage(sName, "School Essentials"))
                        .category(school)
                        .amcApplicable(false)
                        .build());
            }

            // 2. Home Services
            Category home = Category.builder()
                    .name("Home Services")
                    .description("High-end interior design, premium furniture, modular kitchens, plumbing, electrical, and general renovations.")
                    .imageUrl("/all-images/Onevendorsolutions/home.jpg")
                    .build();
            home = categoryRepository.save(home);

            // Services for Home
            String[] homeServices = {
                    "Interior Design", "Furniture", "Modular Kitchen", "Tiles",
                    "Granite", "Painting", "Electrical", "Plumbing",
                    "False Ceiling", "Renovation", "Bathroom"
            };
            for (String sName : homeServices) {
                serviceRepository.save(ServiceEntity.builder()
                        .name(sName)
                        .description("Premium home " + sName + " customization matching modern architectures.")
                        .imageUrl(getServiceImage(sName, "Home Services"))
                        .category(home)
                        .amcApplicable(false)
                        .build());
            }

            // 3. Office Requirements
            Category office = Category.builder()
                    .name("Office Requirements")
                    .description("Ergonomic office furniture, conference rooms, high-capacity workstations, server networking, and AMCs.")
                    .imageUrl("/all-images/Onevendorsolutions/office-desk.jpg")
                    .build();
            office = categoryRepository.save(office);

            // Services for Office
            String[] officeServices = {
                    "Office Furniture", "Conference Room", "Workstations", "Networking",
                    "Storage", "CCTV", "Electrical", "Interior", "AMC"
            };
            for (String sName : officeServices) {
                serviceRepository.save(ServiceEntity.builder()
                        .name(sName)
                        .description("Corporate grade " + sName + " procurement with fast setup turnaround times.")
                        .imageUrl(getServiceImage(sName, "Office Requirements"))
                        .category(office)
                        .amcApplicable(sName.equals("AMC") || sName.equals("CCTV") || sName.equals("Networking"))
                        .build());
            }

            // 4. Coaching Classes
            Category coaching = Category.builder()
                    .name("Coaching Classes")
                    .description("Optimized learning desks, high-quality whiteboards, audio-visual project setups, and fire safety systems.")
                    .imageUrl("/all-images/Onevendorsolutions/school-office-coahing.jpg")
                    .build();
            coaching = categoryRepository.save(coaching);

            // Services for Coaching
            String[] coachingServices = {
                    "Classroom Furniture", "Whiteboards", "Projectors", "Computer Lab",
                    "Interior", "Electrical", "Fire Safety", "CCTV"
            };
            for (String sName : coachingServices) {
                serviceRepository.save(ServiceEntity.builder()
                        .name(sName)
                        .description("Highly durable " + sName + " optimized for high-intensity educational centers.")
                        .imageUrl(getServiceImage(sName, "Coaching Classes"))
                        .category(coaching)
                        .amcApplicable(false)
                        .build());
            }

            System.out.println("Seeded default categories and services successfully.");
        } else {
            // Synchronize existing service image URLs to utilize the client's local images
            List<ServiceEntity> allServices = serviceRepository.findAll();
            for (ServiceEntity service : allServices) {
                String localUrl = getServiceImage(service.getName(), service.getCategory().getName());
                service.setImageUrl(localUrl);
                serviceRepository.save(service);
            }
            System.out.println("Synchronized service image URLs with local client assets successfully.");
        }
    }

    private void seedWebsiteSettings() {
        if (websiteSettingRepository.count() == 0) {
            WebsiteSetting settings = WebsiteSetting.builder()
                    .companyName("One Vendor Solutions")
                    .email("onevendorsolutions@gmail.com")
                    .phone("+91 85760 84127")
                    .address("123 Corporate Blvd, Business District, Delhi, India")
                    .whatsappNumber("918576084127")
                    .aboutText("Experience unified B2B procurement designed for excellence. We simplify your supply chain by providing premium quality essentials for educational institutions, corporate spaces, and residential complexes—all under one reliable roof.")
                    .logoUrl("/logo.jpg")
                    .build();
            websiteSettingRepository.save(settings);
            System.out.println("Seeded default website settings.");
        }
    }

    private void seedTestimonials() {
        if (testimonialRepository.count() == 0) {
            testimonialRepository.save(Testimonial.builder()
                    .name("Aarav Sharma")
                    .position("Principal")
                    .company("Apex International School")
                    .content("OVS completely transformed how we set up our computer and science labs. Excellent quality furniture and timely delivery. Having one contact for uniforms, labs, and classroom furniture is a game-changer.")
                    .rating(5)
                    .imageUrl("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=150&h=150")
                    .build());

            testimonialRepository.save(Testimonial.builder()
                    .name("Priya Patel")
                    .position("HR Director")
                    .company("TechMahindra")
                    .content("The workstations and conference room setup OVS delivered are world-class. Very professional service and clean installation.")
                    .rating(5)
                    .imageUrl("https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=crop&w=150&h=150")
                    .build());

            testimonialRepository.save(Testimonial.builder()
                    .name("Rajesh Iyer")
                    .position("Co-owner")
                    .company("Iyer Coaching Academy")
                    .content("Great furniture, projector screens, and CCTV setup for our new coaching center branch. Outstanding bulk discounts and fast execution.")
                    .rating(4)
                    .imageUrl("https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fit=crop&w=150&h=150")
                    .build());

            System.out.println("Seeded default testimonials.");
        }
    }

    private void seedProjectsAndGallery() {
        if (projectRepository.count() == 0 && categoryRepository.count() > 0) {
            List<Category> cats = categoryRepository.findAll();
            Category school = cats.stream().filter(c -> c.getName().contains("School")).findFirst().orElse(null);
            Category office = cats.stream().filter(c -> c.getName().contains("Office")).findFirst().orElse(null);
            Category coaching = cats.stream().filter(c -> c.getName().contains("Coaching")).findFirst().orElse(null);
            Category home = cats.stream().filter(c -> c.getName().contains("Home")).findFirst().orElse(null);

            if (school != null) {
                projectRepository.save(Project.builder()
                        .name("Smart Classroom Upgrade")
                        .clientName("Heritage High School")
                        .description("Upgraded 25 classrooms with smart interactive panels, high-end short-throw projectors, and ergonomic student desks.")
                        .completionDate(LocalDate.now().minusMonths(3))
                        .imageUrl("/all-images/school/smart class.jpg")
                        .category(school)
                        .build());

                galleryRepository.save(Gallery.builder()
                        .title("Smart Classroom Panels")
                        .imageUrl("/all-images/school/smart class.jpg")
                        .category(school)
                        .build());
            }

            if (office != null) {
                projectRepository.save(Project.builder()
                        .name("Open Office Workstations")
                        .clientName("Infosys Campus B")
                        .description("Delivered 120 custom-branded ergonomic workstations, dynamic conference room setups, and high-capacity network cabling.")
                        .completionDate(LocalDate.now().minusMonths(1))
                        .imageUrl("/all-images/Onevendorsolutions/office-desk.jpg")
                        .category(office)
                        .build());

                galleryRepository.save(Gallery.builder()
                        .title("Conference Table Layout")
                        .imageUrl("/all-images/school/seating-chair.png")
                        .category(office)
                        .build());
            }

            if (coaching != null) {
                projectRepository.save(Project.builder()
                        .name("Ergonomic Learning Desks")
                        .clientName("Elite Academy")
                        .description("Provided study study chairs and customized space-saving study partitions to accommodate 200 students simultaneously.")
                        .completionDate(LocalDate.now().minusMonths(2))
                        .imageUrl("/all-images/school/desk.png")
                        .category(coaching)
                        .build());

                galleryRepository.save(Gallery.builder()
                        .title("Lecture Room Seating")
                        .imageUrl("/all-images/school/classroom-bench'.png")
                        .category(coaching)
                        .build());
            }

            if (home != null) {
                galleryRepository.save(Gallery.builder()
                        .title("Luxury Modular Kitchen")
                        .imageUrl("/all-images/Onevendorsolutions/Simple Kitchen design with a matte finish cabinets.webp")
                        .category(home)
                        .build());
            }

            System.out.println("Seeded default projects and gallery items successfully.");
        } else {
            // Synchronize existing project images
            List<Project> allProjects = projectRepository.findAll();
            for (Project project : allProjects) {
                if (project.getName().contains("Smart")) {
                    project.setImageUrl("/all-images/school/smart class.jpg");
                } else if (project.getName().contains("Office")) {
                    project.setImageUrl("/all-images/Onevendorsolutions/office-desk.jpg");
                } else {
                    project.setImageUrl("/all-images/school/desk.png");
                }
                projectRepository.save(project);
            }

            // Synchronize existing gallery images
            List<Gallery> allGallery = galleryRepository.findAll();
            for (Gallery gal : allGallery) {
                if (gal.getTitle().contains("Classroom")) {
                    gal.setImageUrl("/all-images/school/smart class.jpg");
                } else if (gal.getTitle().contains("Conference")) {
                    gal.setImageUrl("/all-images/school/seating-chair.png");
                } else if (gal.getTitle().contains("Lecture")) {
                    gal.setImageUrl("/all-images/school/classroom-bench'.png");
                } else {
                    gal.setImageUrl("/all-images/Onevendorsolutions/Simple Kitchen design with a matte finish cabinets.webp");
                }
                galleryRepository.save(gal);
            }
            System.out.println("Synchronized projects and gallery image URLs with local client assets successfully.");
        }
    }
}
