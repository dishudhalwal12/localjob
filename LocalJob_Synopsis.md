**3, Institutional Area, Sector-5, Rohini, New Delhi \- 110085**

Affiliated to Guru Gobind Singh Indraprastha University, New Delhi

Recognized u/s 2(f) by UGC | Accredited by NAAC | ISO 9001:2015 Certified

**A**

**Synopsis Report**

**On**

**“LocalJob — Daily Wage Worker**

**Discovery Platform”**

For Partial Fulfilment of Bachelor of Computer Applications (BCA)

(BCA 2022-2025)

| Submitted to Dr. Disha Grover Assistant Professor – IT Department JIMS, Rohini | Submitted by Member 1 Member 2 Member 3 |
| :---- | :---- |

**APRIL, 2025**

**TABLE OF CONTENTS**

| S. No. | Topic | Page No. |
| :---: | ----- | :---: |
| 1\. | Introduction | 3 |
| 2\. | Why Was This Topic Chosen? | 4 |
| 3\. | Objectives and Scope | 5 |
| 4\. | Methodology | 6 |
| 5\. | Technology Stack | 7 |
| 6\. | Testing Technologies Used | 8 |
| 7\. | Limitations and Future Scope | 9 |
| 8\. | Team Work Distribution | 10 |
| 9\. | Conclusion | 11 |

# **1\. INTRODUCTION**

There is an electrician in almost every neighbourhood who everyone seems to know. He fixed the wiring in three houses on the same street. The plumber down the block has been doing repairs in the area for ten years. The carpenter who built that one family's kitchen cabinets is the same one their neighbours call whenever something needs fixing. Word travels. People talk. That is how these workers get their work.

But here is the thing — if you are new to the area, or if the one person who knows the electrician is not around, you are stuck. You go to Urban Company or a similar app. You pay a premium. The worker who shows up has a profile and reviews, sure, but he drove forty minutes to get there. Meanwhile, the actual electrician from the next lane — the one who has done good work for years and charges a fair amount — has no way to show up in any search you do.

These workers are everywhere. Plumbers, painters, carpenters, electricians, tailors, mechanics. Most of them do not have smartphones set up for professional apps. They do not have time to build a profile or collect reviews. They just do the work. And the problem is that their reach stays limited to whoever already knows them personally.

## **1.1 Problem Statement**

### **Problems Faced by Daily Wage Workers:**

**1\.** No online presence means new clients from outside their immediate social circle cannot find them, even if they are highly skilled.

**2\.** Platforms like Urban Company require formal onboarding, documentation, and take service cuts that most local workers cannot afford.

**3\.** Work is inconsistent and seasonal because discovery depends entirely on word-of-mouth, which has a limited range.

**4\.** No way to show their skills or service area in a structured way without technical knowledge.

**5\.** Opportunities dry up whenever they move to a new neighbourhood or city, since they have to rebuild their network from scratch.

### **Problems Faced by People Looking for Help:**

**1\.** Online platforms are expensive or unavailable for small, one-time jobs like fixing a tap or repainting a room.

**2\.** Asking neighbours works but is unreliable, especially if you are new to an area or the task is urgent.

**3\.** No way to find someone nearby quickly without calling around or waiting for someone to recommend a person.

**4\.** No platform shows local workers by skill and area in a simple, searchable format.

# **2\. WHY WAS THIS TOPIC CHOSEN?**

The idea came from something one of us noticed at home. Our neighbour spent three days trying to find a good plumber. She called two people from Urban Company, both cancelled. Eventually someone in the building WhatsApp group mentioned a plumber who lived four streets away. He came the same afternoon and fixed everything in an hour. She said she wished she had known about him before spending three days chasing strangers. That conversation stuck with us.

We started talking about it more and realised it was not a one-off situation. A lot of people in our families had similar stories. A painter who only works locally but has no way to be found. An AC technician in the neighbourhood who charges half of what the big apps charge and does better work. The gap is not about skill. It is about visibility.

## **2.1 Who Is Underserved by Existing Platforms**

Urban Company and similar apps work well for a specific type of service provider — someone who can handle app onboarding, photo uploads, formal documentation, and a share of their earnings going to the platform. That rules out a large portion of actual daily wage workers. The informal sector in India is huge. Millions of workers operate without bank accounts, GST registrations, or smartphones with enough data to run heavy apps. They are left out of the digital economy not because they are less skilled, but because the existing platforms were not built for them.

We also noticed that the people who need small jobs done — fixing a leaking pipe, getting a cupboard painted, having a tailor take in a dress — often do not want to use a big platform. They want someone nearby, someone trustworthy, someone affordable. LocalJob tries to be that connection.

## **2.2 Why This Stack and Approach**

We went with Firebase because we had already used it in some smaller class projects. We knew it could handle real-time data without a heavy backend setup. Bootstrap was the obvious pick for making something look clean without spending weeks on CSS. The key decision we made early on was to keep the app as simple as possible. No login walls for people browsing. No payment flow. No review or rating system in the first version. Just listing and searching. That simplicity was a choice, not a limitation.

## **2.3 What We Personally Got Out of Choosing This**

Honestly, we also wanted to build something that felt real. We have made a few demo projects for class before — a quiz app, a to-do list, a simple inventory tracker. This felt different. There is an actual problem here that affects real people we can see in our daily lives. Building for that felt more meaningful than building something just to submit. 

**3\. OBJECTIVES AND SCOPE**

The main things we wanted the app to do:

**1\.** Build a listing page where daily wage workers can add their name, skill, contact number, and the area they serve.

**2\.** Set up an area-based search so that users can find workers in a specific locality quickly.

**3\.** Create a simple worker profile card showing their skill, area, and contact details without requiring any login from the visitor.

**4\.** Add a filter so users can search by skill type — plumber, electrician, carpenter, painter, and so on.

**5\.** Give workers a way to update or remove their listing without needing technical help.

**6\.** Make the whole interface mobile-first, since most workers and users will access it on a phone.

**7\.** Keep the backend real-time using Firebase so new listings show up without needing a page refresh.

## **3.1 Scope of the Project**

LocalJob covers two main types of users. Workers — primarily daily wage earners like electricians, plumbers, painters, carpenters, mechanics, and tailors — who want to make themselves discoverable online without the complexity of a full platform setup. And people looking for local help — residents, families, or small business owners who want to find a skilled worker nearby quickly. The platform works as a listing board. Workers put in their information. People search, find, and contact them directly. The connection happens outside the app.

We kept a few things out on purpose. There is no payment processing in this version. We did not build a review or rating system. There is no admin panel for managing listings, though we are aware one would be useful. Login for regular users browsing the app is also not required. We kept those out because adding them would have doubled the project scope and we wanted to get the core thing right first.

# **4\. METHODOLOGY**

We did not follow any formal software development methodology by the book. There was no Agile sprint board or project management tool. What we did was work in roughly four phases, moving to the next only when the current one felt stable enough. We used Claude AI during the planning phase to help us think through the database structure and the search logic. GitHub kept our code in sync since all three of us were working on different parts at the same time.

## **4.1 Requirement Gathering**

We spent the first week just talking about what the app needed to do. We wrote everything down in a shared Google Doc. We also spoke to two people in our building — one is a carpenter who does local work, and the other is a housewife who often needs help finding workers. That gave us a much clearer sense of what both sides actually needed. The carpenter told us he just wanted something simple. He said he could not deal with complicated forms or verification steps. That shaped a lot of our decisions.

## **4.2 System Design**

We drew out the main screens on paper first. The home page with a search bar, the listing page, and the add-worker form. Firebase structure was something we thought about carefully. We set up a workers collection where each document holds the worker name, skill, area, phone number, and a timestamp. Area-based search was the trickiest design question. We ended up doing a text-match on the area field, which is simple but works well enough for our use case.

## **4.3 Development**

Member 1 handled the frontend — the Bootstrap layout, the search UI, and the worker cards. Member 2 set up Firebase and wrote the query logic for searching and filtering. Member 3 built the add-listing form and the form validation. We did most of the integration in the third week. That part had a few issues — mostly the search filter and the listing display not updating together properly. We fixed it by restructuring how the query results were passed to the display function. Took about a day and a half.

## **4.4 Testing and Deployment**

We tested on three different phones and two browsers. Most bugs showed up on smaller phone screens — some cards were overflowing, and the search button was misaligned on narrow screens. We fixed those with Bootstrap breakpoint adjustments. The app is deployed on Firebase Hosting. We shared the link with four classmates who did not know what it was and asked them to try finding a plumber. Three of them figured it out in under a minute. One got confused by the area input because we had not added any placeholder text. We added that.

# **5\. TECHNOLOGY STACK**

We picked tools based on three things: they had to be free or nearly free, well documented, and beginner-friendly enough that we could actually use them without getting stuck for days. Here is what we ended up with.

## **5.1 Frontend**

* NEXTJS — the base structure for every page. Nothing fancy here; it is just what everything is built on. Its also used for custom styling on top of Bootstrap wherever the default components did not look right.

* JavaScript (Vanilla) — all the interaction logic, the search function, the dynamic rendering of worker cards. We chose vanilla JS over a framework because the app is simple enough that a framework would have added more complexity than it solved.

* Bootstrap 5 — gave us a responsive grid, ready-made form components, and card layouts. Made the mobile-first design much faster to build.

## **5.2 Backend and Database**

* Firebase Firestore — our main database. We store all worker listings here. Firestore is real-time, which means listings appear without page refreshes. The free tier was more than enough for our scale.

* Firebase Authentication — used only for the worker-facing side, to let them log in and manage their own listing. Visitors browsing do not need to log in at all.

## **5.3 Search and Filtering**

* Area-based text search — built using Firestore queries on the area field. Workers enter their locality when listing, and users search by that same text. It is not GPS-based, but it works well for the hyperlocal use case.

* Skill filter — a simple dropdown filter that queries by the skill field in Firestore. Users can filter for electricians, plumbers, painters, and so on.

## **5.4 Deployment and Version Control**

* Firebase Hosting — for deploying the app. Setup was straightforward and it connects directly to our Firebase project.

* GitHub — for version control. All three of us pushed to the same repository. We had a couple of merge conflicts early on but sorted them out quickly.

## **5.5 Development Tools**

* VS Code — our main code editor. All three of us used it.

* Claude AI — used during planning to help structure the database schema and think through the search logic. Also helped when we got stuck on the Firestore query syntax.

# **6\. TESTING TECHNOLOGIES USED**

We did not use any automated testing framework. Everything was done manually. We know that is not ideal, but given our timeline and skill level, we focused on testing the things that mattered most — does the search work, do listings save properly, does the form handle wrong inputs gracefully.

## **6.1 Functional Testing**

We went through every feature one by one. Adding a new worker listing and checking that it appeared in the database. Searching for a skill in a specific area and checking that only matching results showed. Editing and deleting a listing after logging in. Trying to submit the form with empty fields to see if validation caught it. Most things worked from the first build. The one function that kept failing was the combined filter — searching by both skill and area at the same time. Firestore does not easily support multiple field filters without a composite index, and we had not set one up. Once we created the index in the Firebase console, it worked fine.

## **6.2 Integration Testing**

The main integration point was between the Firebase queries and the JavaScript rendering function. When both the skill filter and the area search were active together, the rendered list was sometimes out of date — showing old results from a previous search. The bug turned out to be that we were not clearing the display before rendering new results. That took about a day to track down and fix. Once it was fixed, the integration was solid.

## **6.3 Usability Testing**

We asked two classmates and one family member who does not use tech much to try the app without any instructions. The classmates navigated it fine. The family member got confused because the search bar said 'Area' but she was not sure if that meant the city, the colony, or the pincode. We changed the placeholder text to say 'Enter your area or colony name' and that helped. We also realised the worker cards needed to show the skill more prominently, so we moved it to the top of the card.

## **6.4 Cross-Device Testing**

We tested on three Android phones of different screen sizes and on two laptops. The most common issue was cards wrapping incorrectly on small screens. Bootstrap's grid helped, but we had to adjust the card column settings for mobile breakpoints. After those fixes, the layout held up on all devices we tested.

# **7\. LIMITATIONS AND FUTURE SCOPE**

## **7.1 Current Limitations**

We want to be honest about what LocalJob does not do yet.

* Search is text-based, not GPS-based. If a user types 'Rohini' but a worker listed their area as 'Rohini Sector 11', the match depends on exact text. It works but it is not smart.

* There is no review or rating system. Users have no way to know if a worker is good other than contacting them directly.

* Anyone can add a listing. There is no verification step, so the platform can have fake or outdated listings.

* The app needs an active internet connection at all times. There is no offline support.

* Workers have to manage their own listing. If they change area or stop working, the listing stays up unless they go in and update it.

## **7.2 Future Scope**

There are a few things we would build next if we had more time.

* GPS-based location detection so users do not have to type their area manually and the app can show workers within a radius automatically.

* A basic review system where people who contacted a worker can leave a short rating after the job is done.

* WhatsApp integration so a user can tap a button on a worker card and directly open a WhatsApp chat with that worker.

* An admin dashboard to review new listings before they go live, and to remove outdated or fake ones.

* A worker dashboard where they can see how many times their listing has been viewed or how many people clicked on their contact number.

# **8\. TEAM WORK DISTRIBUTION**

We split the work based on what each of us was most comfortable with. It was not a rigid split — there was a lot of overlap, especially during integration. But here is roughly how things went.

## **8.1 Member 1 — Frontend and UI**

Member 1 took on the entire frontend. That meant laying out the pages using Bootstrap, building the worker card components, designing the search bar and filter UI, and making sure everything looked right on mobile. The trickiest part was the card layout on small screens — Bootstrap's grid does not always behave how you expect when you mix columns of different sizes. Member 1 had to go through the Bootstrap documentation in detail to figure out the right breakpoint classes. The final UI is clean and simple, which was the goal from day one.

## **8.2 Member 2 — Firebase and Backend Logic**

Member 2 set up the entire Firebase project — the Firestore database, the authentication rules, and the hosting setup. The search and filter logic was also Member 2's work. Writing Firestore queries that combined area text matching with a skill filter took a few attempts. The composite index issue came up here and took some time to resolve. Member 2 also handled the deployment and made sure the Firebase security rules were set correctly so only logged-in workers could write to the database, but anyone could read.

## **8.3 Member 3 — Forms, Validation, and Integration**

Member 3 built the add-listing form and the edit/delete functionality that workers use to manage their own listing. Form validation was a big focus here — making sure the phone number field only accepts numbers, that the area field is not left blank, and that the skill dropdown always has a valid selection. Member 3 also did most of the integration work, connecting the frontend cards with the Firebase query results. The bug where old results were not being cleared before new ones rendered — Member 3 tracked that down and fixed it.

## **8.4 Shared Work**

All three of us did the initial requirement gathering together, including the conversations with the carpenter and the housewife from our building. The final round of cross-device testing was also a shared session where we all sat together and went through each scenario. The project report and documentation were written by all three of us over a shared Google Doc. Looking back, the work split was fair and everyone contributed something real to the final product.

# **9\. CONCLUSION**

The problem LocalJob was built to solve is simple: skilled workers who live nearby have no way to be found by people who need them. The fix is also simple — a listing board with area-based search. We did not overcomplicate it.

This project taught us things we could not have learned in a classroom. Firebase queries, real-time data rendering, mobile-first layouts with Bootstrap, and the messier work of figuring out why a filter is returning wrong results at 11 PM. Member 1 got much more comfortable with responsive design. Member 2 now actually understands Firestore indexes, which are one of those things that are confusing until you have broken something because of them. Member 3 learned a lot about form validation and the small edge cases that users will always find if you do not handle them.

The app does what it is supposed to do. Workers can list themselves. People can search by skill and area. Contact happens directly. There are gaps — no GPS, no reviews, no admin panel — but those are honest gaps, not oversights we did not notice.

We tried to build something useful, not something impressive on paper. A real electrician in a real neighbourhood should be findable by a real family who needs their wiring checked. That is the whole idea. We think LocalJob manages to do that.

**\* \* \* End of Synopsis \* \* \***