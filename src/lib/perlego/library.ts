// The 30-title reading catalogue. Metadata is taken from the supplied
// spreadsheet; the page extracts are written for the demo reader.

export type RStyle = {
  font: string;
  bg: string;
  ink: string;
  accent: string;
  size: number;
  leading: number;
  align: "left" | "justify";
  caps: boolean;
};

export const STYLES: RStyle[] = [
  { font: "'EB Garamond',Georgia,serif", bg: "#f7f3e8", ink: "#231f1b", accent: "#8a6a2f", size: 19, leading: 1.62, align: "left", caps: true },
  { font: "'Libre Baskerville',Georgia,serif", bg: "#ffffff", ink: "#1c1c1c", accent: "#2a3b6b", size: 17, leading: 1.72, align: "left", caps: false },
  { font: "'Lora',Georgia,serif", bg: "#fbf8f1", ink: "#26221d", accent: "#8c2f2f", size: 18, leading: 1.68, align: "justify", caps: false },
  { font: "'Spectral',Georgia,serif", bg: "#faf7ef", ink: "#201e1a", accent: "#3327ec", size: 18.5, leading: 1.64, align: "left", caps: true },
  { font: "'Crimson Pro',Georgia,serif", bg: "#ffffff", ink: "#222", accent: "#4a6b2f", size: 19.5, leading: 1.6, align: "justify", caps: false },
  { font: "'Playfair Display',Georgia,serif", bg: "#f4f1ea", ink: "#1f1d1a", accent: "#6b3f8a", size: 17.5, leading: 1.7, align: "left", caps: false },
];

export type RBook = {
  id: string;
  gid: string;
  title: string;
  author: string;
  year: string;
  category: string;
  subtopics: string[];
  language: string;
  pages: number;
  description: string;
  tags: string[];
  related: string[];
  cover: string;
  thumb: string;
  link: string;
  style: number;
  label?: string;
  folio: number;
  paras: string[];
};

type Seed = {
  id: string;
  gid: string;
  title: string;
  author: string;
  year: string;
  category: string;
  subtopics: string;
  pages: number;
  description: string;
  tags: string;
  related: string;
  label?: string;
  folio: number;
  paras: string[];
};

const SEEDS: Seed[] = [
  {
    id: "RB001", gid: "KAjBXwAACAAJ", title: "Thinking, Fast and Slow", author: "Daniel Kahneman", year: "2011",
    category: "Psychology", subtopics: "Decision-making | Cognitive biases | Behavioural economics", pages: 499,
    description: "A widely read exploration of the two systems that shape judgment and decision-making, from fast intuition to slow reasoning.",
    tags: "decision-making | bias | heuristics | psychology | behaviour", related: "RB002 | RB003 | RB004",
    label: "The Characters of the Story", folio: 19,
    paras: [
      "To observe your mind in automatic mode, glance at the photograph of an angry face and you will know, before you have decided to know anything, that the woman is furious and that she is about to say something loud and unkind. You did not intend to form that impression. It happened to you.",
      "Now consider a problem: 17 × 24. You knew at once that this is a multiplication, and probably that you could solve it with paper and pencil. You also felt, vaguely, the range in which the answer might lie. Nothing further occurred until you decided to commit. If you did, you experienced the peculiar effort of holding material in mind while working through the steps.",
      "I describe mental life by the metaphor of two agents, called System 1 and System 2, which respectively produce fast and slow thinking. System 1 operates automatically and quickly, with little or no effort and no sense of voluntary control. System 2 allocates attention to the effortful mental activities that demand it, including complex computation.",
      "The division of labour between them is highly efficient: it minimises effort and optimises performance. The arrangement works well most of the time because System 1 is generally very good at what it does. Its models of familiar situations are accurate, its short-term predictions are usually appropriate, and its initial reactions to challenges are swift and generally suitable.",
      "System 1 has biases, however, systematic errors that it is prone to make in specified circumstances. It sometimes answers easier questions than the one that was asked, and it has little understanding of logic and statistics. One further limitation: it cannot be turned off.",
    ],
  },
  {
    id: "RB002", gid: "FrOMEAAAQBAJ", title: "Nudge", author: "Richard H. Thaler and Cass R. Sunstein", year: "2008",
    category: "Psychology", subtopics: "Behavioural economics | Choice architecture | Public policy", pages: 320,
    description: "Introduces choice architecture and shows how small design changes can influence behaviour without removing freedom of choice.",
    tags: "choice architecture | behavioural economics | policy | behaviour | design", related: "RB001 | RB003 | RB004",
    label: "Introduction", folio: 3,
    paras: [
      "A school cafeteria offers the same food every day. In one arrangement the desserts sit at eye level by the till; in another the fruit does. Nothing is forbidden, nothing costs more, and yet the consumption of any given item shifts by as much as a quarter. Whoever decides the order of the trays is a choice architect, whether or not anybody gave them the title.",
      "We use the term nudge for any aspect of the choice architecture that alters people's behaviour in a predictable way without forbidding any options or significantly changing their economic incentives. To count as a mere nudge, the intervention must be easy and cheap to avoid. Nudges are not mandates. Putting fruit at eye level counts as a nudge. Banning junk food does not.",
      "The reason nudges work is that human beings are not the frictionless calculating agents of economic textbooks. We are busy, distracted, attached to the status quo, and disproportionately moved by what is vivid and recent. Designs that ignore this produce outcomes that nobody wanted, least of all the people making the choices.",
      "Our approach we call libertarian paternalism. The libertarian half insists that people should be free to do what they like, and to opt out of arrangements they find unwelcome. The paternalistic half claims that it is legitimate for institutions to steer behaviour in directions that will improve the lives of the people being steered, as judged by those people themselves.",
      "Everything in the chapters that follow rests on a simple observation: there is no such thing as neutral design. Some arrangement of the trays must be chosen. The only question is whether it is chosen carelessly or well.",
    ],
  },
  {
    id: "RB003", gid: "BBMlzgEACAAJ", title: "Influence", author: "Robert B. Cialdini", year: "1984",
    category: "Psychology", subtopics: "Persuasion | Social psychology | Behaviour", pages: 336,
    description: "A classic book on the psychology of persuasion, explaining the principles that shape compliance and decision-making.",
    tags: "persuasion | psychology | social proof | behaviour | influence", related: "RB001 | RB002 | RB004",
    label: "Weapons of Influence", folio: 7,
    paras: [
      "I can admit it freely now: all my life I have been a patsy. For as long as I can recall, I have been an easy mark for the pitches of peddlers, fund-raisers and operators of one sort or another. Only some of these people had honourable motives. The others did not. My discomfort at the pattern eventually became professional curiosity.",
      "A friend of mine owned an Indian jewellery shop in Arizona. A batch of turquoise would not move, despite the peak tourist season and a prominent display. In frustration she left a note for her head saleswoman instructing her to halve the price. Days later the lot had sold. She had, of course, mistakenly doubled it.",
      "The customers, mostly well-to-do holidaymakers with little knowledge of turquoise, were using a standard principle to guide their buying: expensive equals good. They were not stupid. They were relying on a rule that usually serves them well, in a situation engineered, by accident, to make the rule mislead them.",
      "Ethologists call such behaviour fixed-action patterns, and note that they can be triggered by a single feature of the situation rather than the whole of it. Humans have such patterns too, and the trigger features that set them off are the raw material of the compliance professional's craft.",
      "In the chapters that follow I examine six principles that direct human behaviour in this automatic way — reciprocation, consistency, social proof, liking, authority and scarcity — and the tactics practitioners build on each.",
    ],
  },
  {
    id: "RB004", gid: "BfTQr6tpn0wC", title: "The Righteous Mind", author: "Jonathan Haidt", year: "2012",
    category: "Psychology", subtopics: "Moral psychology | Politics | Culture", pages: 419,
    description: "Explores why good people disagree about politics and religion through moral psychology and social intuition.",
    tags: "morality | politics | psychology | culture | intuition", related: "RB001 | RB002 | RB003",
    label: "Where Does Morality Come From?", folio: 11,
    paras: [
      "Consider the following story. A family's dog is killed by a car outside their house. They have heard that dog meat is delicious, so they cut up the body, cook it and eat it for dinner. Nobody sees them do it. Nobody is harmed.",
      "Most people I have asked react immediately: that is wrong. Asked why, they search for a victim, fail to find one, and then hold to the judgement anyway. \"It's just wrong,\" they say, often laughing at their own certainty. That gap between the verdict and the reasoning is the subject of this book.",
      "The central metaphor is that the mind is divided, like a rider on an elephant, and the rider's job is to serve the elephant. Intuitions come first; strategic reasoning second. We do not reason our way to moral conclusions so much as we reason our way to the defence of conclusions already reached.",
      "This explains why moral arguments are so frustrating and so rarely productive. When you challenge a person's reasons you are attacking the rider, who was never in charge. The elephant leans, and new reasons appear as fast as the old ones are knocked down.",
      "It also explains something more hopeful. If intuitions are built on a small number of moral foundations, and if political tribes rest their weight on different ones, then disagreement is not simply a matter of one side failing to think. It is a matter of different moral senses, each of them partly right.",
    ],
  },
  {
    id: "RB005", gid: "R42aBAAAQBAJ", title: "Hooked", author: "Nir Eyal", year: "2014",
    category: "Business & Economics", subtopics: "Product design | Habits | Consumer behaviour", pages: 256,
    description: "A product-focused guide to habit-forming products and the behavioural loops that bring users back.",
    tags: "product design | habits | retention | behaviour | growth", related: "RB008 | RB009 | RB010",
    label: "The Habit Zone", folio: 5,
    paras: [
      "Seventy-nine per cent of smartphone owners check their device within fifteen minutes of waking up. A third of adults say they would rather give up sex than lose their phone. We are not thinking about these behaviours. That is exactly the point.",
      "Habits are behaviours done with little or no conscious thought. The convergence of access, data and speed is making the world a more habit-forming place, and the companies that master the mechanics of habit have quietly acquired something more valuable than attention: default status.",
      "This book describes a four-step pattern I call the Hook Model. A trigger prompts the user to act. The action is the simplest behaviour in anticipation of a reward. The reward is variable, and so the craving persists. Finally the user invests something — data, content, reputation, effort — which loads the next trigger.",
      "Run the loop enough times and external triggers become unnecessary. The user's own internal states, boredom, loneliness, uncertainty, begin to do the work that a notification used to do. That transition is the difference between a product people use and a product people need.",
      "Because the same mechanics serve both, the last chapter of this book is about manipulation. Builders of hooks carry a responsibility to ask whether the habit they are forming materially improves the life of the person forming it.",
    ],
  },
  {
    id: "RB006", gid: "vo5REQAAQBAJ", title: "Atomic Habits", author: "James Clear", year: "2018",
    category: "Psychology", subtopics: "Habits | Self-improvement | Behaviour change", pages: 320,
    description: "A practical book on building better habits through small changes, systems and repetition.",
    tags: "habits | behaviour change | self-improvement | routines | systems", related: "RB001 | RB002 | RB003",
    label: "The Surprising Power of Tiny Gains", folio: 15,
    paras: [
      "In 2003 British Cycling hired a new performance director who believed in something he called the aggregation of marginal gains: the one per cent improvement in everything you do. They redesigned the seats, rubbed alcohol on the tyres, tested massage gels, and learned which pillow each rider slept best on.",
      "Five years later the team won sixty per cent of the gold medals available at the Beijing Olympics. None of the individual changes explains that. Their accumulation does.",
      "Habits are the compound interest of self-improvement. Get one per cent better every day for a year and you end up thirty-seven times better. The mathematics is unremarkable; what is remarkable is how little the effect shows on any given day, and how completely it decides the year.",
      "This is why small changes so often appear to make no difference until you cross a critical threshold. It is also why bad habits are so easy to keep. A single cigarette does not cause cancer. A single missed workout does not lose fitness. The cost arrives later, all at once.",
      "So forget about goals; focus on systems instead. Winners and losers have the same goals. What separates them is the set of processes that they repeat, and the identity those processes gradually construct.",
    ],
  },
  {
    id: "RB007", gid: "heCtnQEACAAJ", title: "The Design of Everyday Things", author: "Don Norman", year: "1988",
    category: "Technology & Society", subtopics: "Design | Human-computer interaction | Usability", pages: 368,
    description: "A foundational design book about usability, affordances, feedback and how people interact with products and systems.",
    tags: "design | usability | UX | HCI | products", related: "RB013 | RB014 | RB015",
    label: "The Psychopathology of Everyday Things", folio: 9,
    paras: [
      "If I were placed in the cockpit of a modern jet airliner, my inability to fly it would neither surprise nor bother me. But why should I have trouble with doors and light switches, washing machines and taps? Doors? Something as simple as a door has to be complicated?",
      "I have watched people at glass doors push when they should pull, at sliding doors search for a hinge, and at cabinet doors try the wrong side. A door poses only two essential questions: which side to operate, and whether to push or pull. The answers should be given by the design.",
      "Two of the most important characteristics of good design are discoverability and understanding. Discoverability: is it possible even to figure out what actions are possible, and where and how to perform them? Understanding: what does it all mean? How is the product supposed to be used?",
      "The design of everyday things is in great danger of becoming the design of superfluous, overloaded, unnecessary objects. Engineers are trained to think logically, and as a result they come to believe that all people must think this way. They design for people as they imagine them, not as they are.",
      "When people have trouble with something, it is not their fault. It is the fault of the design. The words affordance, signifier, mapping and feedback are in this book for one purpose: to give that observation enough structure to act on.",
    ],
  },
  {
    id: "RB008", gid: "DOyJDQAAQBAJ", title: "Made to Stick", author: "Chip Heath and Dan Heath", year: "2007",
    category: "Business & Economics", subtopics: "Communication | Ideas | Behaviour", pages: 336,
    description: "Why some ideas survive and others die, and the qualities that make a message memorable.",
    tags: "communication | ideas | storytelling | behaviour | memory", related: "RB005 | RB009 | RB010",
    label: "What Sticks?", folio: 4,
    paras: [
      "A friend of a friend travels for business. In a hotel bar a woman offers to buy him a drink. He wakes in his own bath, packed in ice, with a line of stitches down his lower back and a note telling him to call 911. His kidney has been harvested.",
      "You have heard this story before, and you will be able to retell it accurately weeks from now. Compare that with the last corporate strategy presentation you sat through. The urban legend beats it, decisively, and not because someone spent more money on it.",
      "Six principles run through ideas that stick. Simplicity: find the core and say it. Unexpectedness: break a pattern to open a gap in the listener's knowledge. Concreteness: describe things a person can see. Credibility: give the claim something to stand on. Emotion: make people feel something about something, not about statistics. Stories: give them a simulation they can run.",
      "The villain of this book is the Curse of Knowledge. Once you know a thing it becomes almost impossible to imagine not knowing it, and you begin to speak in the summarised abstractions that your own expertise permits. Tappers of a tune cannot hear that listeners hear only tapping.",
      "None of the six principles requires talent. They are checkable. That is why they are worth learning, and why so many brilliant ideas go nowhere without them.",
    ],
  },
  {
    id: "RB009", gid: "1fbingEACAAJ", title: "Contagious", author: "Jonah Berger", year: "2013",
    category: "Business & Economics", subtopics: "Marketing | Virality | Social influence", pages: 256,
    description: "A study of why certain products, ideas and behaviours spread through social transmission.",
    tags: "marketing | virality | word of mouth | social influence | behaviour", related: "RB005 | RB008 | RB010",
    label: "Social Currency", folio: 6,
    paras: [
      "On a side street in Manhattan, a hot dog restaurant hides a phone booth at the back. Step inside, dial two, and a hidden door opens onto a bar that officially does not exist. It has no sign and it does not advertise, and it is nearly impossible to get a table.",
      "The bar breaks every rule of promotion, and word of mouth about it is relentless. Why? Because telling someone about it says something flattering about you. People share things that make them look sharp, informed and in the know. Call it social currency.",
      "Word of mouth drives twenty to fifty per cent of purchasing decisions, and it is more effective than advertising for two reasons: it is more persuasive, because friends have no reason to flatter; and it is better targeted, because people do not bother passing information to those who will not care.",
      "Across the book I set out six ingredients of contagious content — social currency, triggers, emotion, public visibility, practical value and stories. Most viral successes contain several, and almost none of them contain luck alone.",
      "The temptation is to believe that certain products are simply born interesting. The evidence suggests otherwise. A blender and a celebrity can both fail to travel; a blender that destroys an iPhone will travel very far indeed.",
    ],
  },
  {
    id: "RB010", gid: "prDZAQAACAAJ", title: "The Lean Startup", author: "Eric Ries", year: "2011",
    category: "Business & Economics", subtopics: "Startups | Product development | Experimentation", pages: 336,
    description: "A method for building companies through validated learning, rapid experiments and iterative product releases.",
    tags: "startups | experimentation | product development | learning | entrepreneurship", related: "RB005 | RB011 | RB012",
    label: "Start", folio: 8,
    paras: [
      "Startup failure is commonly explained by one of two stories. In the first, a great idea meets poor execution. In the second, execution was fine and the idea was always doomed. Both stories share an assumption worth questioning: that you can know which you had before you built anything.",
      "A startup is a human institution designed to create a new product or service under conditions of extreme uncertainty. That definition says nothing about garages, technology or company size. It says that the founding problem is not building; it is learning what should be built.",
      "The Lean Startup method asks you to state your assumptions as hypotheses, then design the smallest experiment that could show whether they hold. The unit of progress is validated learning, not lines of code, features shipped or months survived.",
      "The engine of the method is the Build–Measure–Learn feedback loop. You plan it in the reverse order in which you execute it: decide what you need to learn, work out what you must measure to know it, then build the minimum product that produces those measurements.",
      "The hardest decision the loop forces is the pivot: a structured change in course to test a new fundamental hypothesis. Companies rarely die from pivoting. They die from delaying the pivot while the runway quietly disappears.",
    ],
  },
  {
    id: "RB011", gid: "_2ZRzQEACAAJ", title: "Inspired", author: "Marty Cagan", year: "2008",
    category: "Business & Economics", subtopics: "Product management | Teams | Innovation", pages: 368,
    description: "How strong product teams discover and deliver technology products that customers love.",
    tags: "product management | teams | discovery | innovation | leadership", related: "RB010 | RB012 | RB005",
    label: "Behind Every Great Product", folio: 12,
    paras: [
      "Behind every great product there is someone — usually someone behind the scenes, working tirelessly — who led the product team to combine technology and design to solve real customer problems in a way that met the needs of the business.",
      "These people usually hold the title of product manager, but the title tells you almost nothing about how the job is done. In the best companies it is a job of deep understanding: of the customer, of the data, of the business, and of what is now possible.",
      "Most companies do product the same wrong way. Ideas arrive from executives as a roadmap. Requirements are documented, designs are applied like paint, engineers estimate, and the whole procession marches to a release date. Then the results come in, and the least valuable part of the process is the only part that anybody honestly measures.",
      "Two inconvenient truths about product sit behind this. At least half of our ideas are simply not going to work. And even the good ideas take several iterations to deliver the business value we expected.",
      "Strong teams therefore run discovery and delivery in parallel, continuously. Product discovery addresses value, usability, feasibility and viability before an engineering quarter is spent on the answer.",
    ],
  },
  {
    id: "RB012", gid: "y1ONEAAAQBAJ", title: "Platform Revolution", author: "Geoffrey G. Parker, Marshall W. Van Alstyne and Sangeet Paul Choudary", year: "2016",
    category: "Business & Economics", subtopics: "Platforms | Network effects | Digital business", pages: 352,
    description: "How networked markets are transforming the economy, and the rules that govern platform businesses.",
    tags: "platforms | network effects | strategy | digital business | markets", related: "RB010 | RB011 | RB016",
    label: "Today, Nothing Happens in Isolation", folio: 10,
    paras: [
      "In 2007 the five major mobile handset makers held ninety per cent of the industry's global profits. By 2015 a single platform, the iPhone, generated more profit than all of them combined. The story of that decade is not a story of better hardware.",
      "A platform is a business based on enabling value-creating interactions between external producers and consumers. It provides an open, participative infrastructure and sets governance conditions. Its overarching purpose is to consummate matches among users and facilitate the exchange of goods, services or social currency.",
      "The traditional firm creates value by controlling a linear series of activities — the pipeline model. Platforms do not own the means of production; they create the means of connection. That difference reverses much of the received wisdom of strategy.",
      "Where pipelines optimise for resource control and internal efficiency, platforms optimise for resource orchestration, external interaction and ecosystem value. Positive network effects, not economies of scale, are the primary source of advantage.",
      "This also changes what can go wrong. Platforms fail through the wrong side of the market being under-served, through poor curation, and through governance that allows the interactions to become worthless to the people the platform needs most.",
    ],
  },
  {
    id: "RB013", gid: "GraMEAAAQBAJ", title: "Algorithms to Live By", author: "Brian Christian and Tom Griffiths", year: "2016",
    category: "Technology & Society", subtopics: "Algorithms | Decision-making | Computer science", pages: 368,
    description: "What computer science says about human decisions: when to stop looking, how to sort, and when to leave things to chance.",
    tags: "algorithms | decision-making | computer science | optimisation | psychology", related: "RB001 | RB014 | RB015",
    label: "Optimal Stopping", folio: 13,
    paras: [
      "You are looking for a flat in a city where good ones are taken within hours. Each viewing forces an immediate decision: commit, or lose it and move on. How many flats should you see before you take one?",
      "The problem has an exact answer, and it is thirty-seven per cent. Spend the first thirty-seven per cent of your search gathering information and refusing everything. After that, take the first option better than anything you have already seen. This yields the best available candidate thirty-seven per cent of the time, which is provably the most any strategy can guarantee.",
      "What is striking is not the number but the shape of the advice. The optimal policy accepts a high chance of failure as the price of the best possible chance of success. Explore, then exploit, and do not confuse the two phases.",
      "Computer science has spent seventy years on problems that turn out to be the problems of a life: how to allocate scarce attention, when to abandon a queue, how much disorder in a filing system is efficient rather than shameful.",
      "Seen this way, being rational does not mean considering everything. It means knowing which computations are worth performing, and accepting a good answer arrived at cheaply over a perfect one that arrives too late.",
    ],
  },
  {
    id: "RB014", gid: "3gOOEAAAQBAJ", title: "Weapons of Math Destruction", author: "Cathy O'Neil", year: "2016",
    category: "Technology & Society", subtopics: "Algorithms | Data ethics | Society", pages: 272,
    description: "How opaque scoring models reinforce inequality across lending, policing, hiring and education.",
    tags: "algorithms | data ethics | inequality | society | statistics", related: "RB013 | RB015 | RB016",
    label: "Bomb Parts", folio: 14,
    paras: [
      "Sarah Wysocki had been teaching fifth grade for two years when she was fired. Parents praised her, her principal rated her highly, and a scoring model gave her a number in the bottom two per cent. Nobody could explain the number, and nobody was obliged to.",
      "Models are opinions embedded in mathematics. They require choices about what to measure and what to ignore, and those choices are invisible to the people the model judges. When the choices are hidden, unaccountable and operating at scale, I call the result a weapon of math destruction.",
      "Three features define such a model: opacity, scale and damage. It cannot be inspected, it processes thousands or millions of people, and its errors are not distributed evenly. They fall on the poor and the already-suspected, which is precisely where the model's feedback loops close.",
      "A recidivism score asks whether the defendant's neighbours have been arrested. A hiring filter learns which postcodes previous successful hires came from. Neither model mentions race. Both perform it faithfully.",
      "The promise of these systems was impartiality. In practice they launder prejudice into arithmetic and then declare the arithmetic unarguable. Auditing them is not a technical luxury; it is the whole of the accountability we have left.",
    ],
  },
  {
    id: "RB015", gid: "KGCNEAAAQBAJ", title: "The Alignment Problem", author: "Brian Christian", year: "2020",
    category: "Technology & Society", subtopics: "Artificial intelligence | Ethics | Machine learning", pages: 496,
    description: "How machine learning systems acquire our values, and what happens in the gap where they do not.",
    tags: "artificial intelligence | ethics | machine learning | alignment | society", related: "RB013 | RB014 | RB016",
    label: "Representation", folio: 17,
    paras: [
      "In 2017 a researcher asked a widely used word model to complete an analogy. Man is to computer programmer as woman is to — the model answered homemaker. It had not been taught this. It had read us.",
      "Machine learning systems do not follow instructions. They infer what we want from examples, and the examples carry everything we failed to say. This is the alignment problem: the distance between the objective we specify and the objective we actually hold.",
      "The distance shows up in small comic failures and large moral ones. A boat-racing agent learns to spin in circles collecting points instead of finishing the course. A vision model decides that a field of grass is sufficient evidence of a cow.",
      "What makes the problem hard is not that our values are complicated, though they are. It is that they are largely unstated, contextual and mutually contradictory, and that we discover them mainly by noticing when something has gone wrong.",
      "The researchers in this book are trying to close the gap from both ends: by learning objectives from human behaviour rather than specification, and by building systems that remain uncertain about what we want and therefore remain correctable.",
    ],
  },
  {
    id: "RB016", gid: "tKr0QwAACAAJ", title: "The Master Switch", author: "Tim Wu", year: "2010",
    category: "Technology & Society", subtopics: "Media history | Technology | Power", pages: 384,
    description: "A history of information empires, and the cycle by which open industries close around a single dominant firm.",
    tags: "media history | monopoly | technology | power | regulation", related: "RB012 | RB014 | RB018",
    label: "Disruptive Founders", folio: 2,
    paras: [
      "In 1876 a deaf-education teacher with no commercial standing demonstrated a device that transmitted speech along a wire. Western Union, then one of the most powerful corporations on earth, was offered the patent for one hundred thousand dollars and declined. The telephone was a toy.",
      "History shows a typical progression of information technologies: from somebody's hobby to somebody's industry; from jury-rigged contraption to slick production marvel; from a freely accessible channel to one strictly controlled by a single corporation or cartel.",
      "I call this the Cycle, and its motor is not villainy but investment. Openness invites invention; invention invites capital; capital demands predictability; predictability is purchased through control of the wire, the spectrum, the standard or the store.",
      "The Cycle has run through telephony, radio, film and television, each time producing a firm confident that its dominance reflected the natural order of the medium, and each time producing a regulator willing to agree.",
      "The question this book asks of the internet is not whether it is different in kind. It is whether anything about it prevents the Cycle from running one more time, and who exactly would hold the master switch if it did.",
    ],
  },
  {
    id: "RB017", gid: "zfuOEAAAQBAJ", title: "Sapiens", author: "Yuval Noah Harari", year: "2011",
    category: "History & Politics", subtopics: "World history | Anthropology | Society", pages: 464,
    description: "A sweeping account of how one species of ape came to dominate the planet, told through cognition, agriculture and empire.",
    tags: "world history | anthropology | society | evolution | culture", related: "RB018 | RB019 | RB020",
    label: "An Animal of No Significance", folio: 3,
    paras: [
      "About 13.5 billion years ago matter, energy, time and space came into being in what is known as the Big Bang. Some 3.8 billion years ago certain molecules combined to form structures called organisms. And about 70,000 years ago, organisms belonging to the species Homo sapiens began to form elaborate structures called cultures.",
      "Homo sapiens was an animal of no significance for most of its existence, minding its own business in a corner of Africa, with no more impact on its environment than gorillas, fireflies or jellyfish. Then something changed in the way it thought and communicated.",
      "The Cognitive Revolution gave our species the ability to speak about things that do not exist. Lions, horses and rivers can be described by many animals; no other animal can persuade its neighbours to die for a flag, or to accept a small round piece of metal in exchange for a year of labour.",
      "Nations, money, corporations and human rights are fictions in the precise sense that they exist only in the collective imagination. This does not make them weak. It makes them scalable, because unlike a family or a troop they can bind strangers into cooperation on any scale we can narrate.",
      "What follows is the history of three revolutions — cognitive, agricultural and scientific — and a question that the record answers less flatteringly than we might hope: whether any of them made the individual human being happier.",
    ],
  },
  {
    id: "RB018", gid: "ivmMEAAAQBAJ", title: "Why Nations Fail", author: "Daron Acemoglu and James A. Robinson", year: "2012",
    category: "History & Politics", subtopics: "Institutions | Political economy | Development", pages: 544,
    description: "An institutional account of prosperity and poverty, built on the difference between inclusive and extractive systems.",
    tags: "institutions | political economy | development | inequality | history", related: "RB017 | RB019 | RB020",
    label: "So Close and Yet So Different", folio: 7,
    paras: [
      "The city of Nogales is cut in half by a fence. North of it, in Arizona, the average household income is around thirty thousand dollars, most adults finished secondary school, and the old expect to draw a pension. South of it, in Sonora, income is a third as much, schooling is shorter, infant mortality higher.",
      "The people on either side share ancestors, climate, cuisine, disease environment and geography. Whatever explains the gap, it is not culture, not location and not ignorance of how to do better. It is the different rules each half lives under, and the different histories that produced those rules.",
      "We distinguish inclusive economic institutions, which secure property, enforce contracts impartially and allow people to choose their occupations, from extractive ones, designed to transfer resources from the many to a narrow elite.",
      "Economic institutions are sustained by political ones. Inclusive politics distributes power broadly and constrains its use; extractive politics concentrates it and protects the concentration. The two reinforce one another, which is why both prosperity and poverty are so persistent.",
      "The engine of growth under inclusive institutions is creative destruction, and that is precisely what an extractive elite cannot permit. Technology threatens whoever currently holds the rents, and in an extractive system those holders also write the law.",
    ],
  },
  {
    id: "RB019", gid: "_mRHrgEACAAJ", title: "The Silk Roads", author: "Peter Frankopan", year: "2015",
    category: "History & Politics", subtopics: "Global history | Trade | Empire", pages: 672,
    description: "A history of the world told from its centre of gravity, the trade routes running east to west.",
    tags: "global history | trade | empire | asia | connection", related: "RB017 | RB018 | RB020",
    label: "The Creation of the Silk Road", folio: 5,
    paras: [
      "As a boy I would stare at a map of the world above my bed, and notice that everything I was taught about the past concerned a small peninsula on its western edge. The middle of the map, the belt of land running from the Mediterranean to the Pacific, appeared in my lessons only when Europeans arrived in it.",
      "Yet this was where the world's great religions took shape, where cities of half a million people stood while London was a market town, and where the goods, diseases, techniques and beliefs that shaped every continent were exchanged.",
      "The routes were never a single road, and silk was only their most glamorous cargo. Along them travelled paper and gunpowder, slaves and astronomers, Buddhism, Christianity, Islam and Manichaeism, plague bacteria and the mathematics that made modern finance possible.",
      "Empires rose where they could tax that traffic and fell when it moved. Persia, Rome, the Abbasid caliphate, the Mongols and the Ottomans are best understood not as separate stories but as successive managers of the same crossroads.",
      "Shifting the vantage point from London to Samarkand does not add a chapter to the familiar chronology. It rearranges it, and leaves the European centuries looking less like the plot than like an unusually well-documented episode.",
    ],
  },
  {
    id: "RB020", gid: "OwVrSMQPPowC", title: "Guns, Germs, and Steel", author: "Jared Diamond", year: "1997",
    category: "History & Politics", subtopics: "Civilisation | Geography | History", pages: 480,
    description: "A geographic explanation for the unequal development of human societies over thirteen thousand years.",
    tags: "civilisation | geography | history | agriculture | disease", related: "RB017 | RB018 | RB019",
    label: "Yali's Question", folio: 9,
    paras: [
      "In 1972, on a beach in New Guinea, a local politician named Yali asked me a question. Why is it, he said, that you white people developed so much cargo and brought it to New Guinea, but we black people had little cargo of our own?",
      "The question was posed simply and it is not a simple question. Behind Yali's cargo lay the whole unequal history of the modern world: literacy, steel, ocean-going ships, political organisation and the diseases that did most of the killing.",
      "Racial explanations of that inequality are both repugnant and wrong; the evidence for differences in innate ability is absent. But dismissing the bad answer does not excuse us from finding a good one, and history plainly did not distribute its gifts at random.",
      "The answer this book defends is geographic. Continents differed in the wild plants and animals available for domestication, and in their orientation: Eurasia's long east–west axis let crops, livestock and inventions travel along a single band of climate, while the Americas and Africa run north to south, across every climate there is.",
      "Food surpluses supported dense settlements, which produced specialists, states, writing and steel — and, in the company of herd animals, the epidemic diseases that would precede every European army by a generation.",
    ],
  },
  {
    id: "RB021", gid: "PMLnbx06vOEC", title: "The Power Broker", author: "Robert A. Caro", year: "1974",
    category: "History & Politics", subtopics: "Cities | Infrastructure | Power", pages: 1336,
    description: "The life of Robert Moses and the machinery of unelected power that reshaped New York.",
    tags: "cities | infrastructure | power | biography | politics", related: "RB018 | RB016 | RB019",
    label: "The Line of the Shore", folio: 21,
    paras: [
      "Once there was a young man with ideals. He wrote a doctoral thesis attacking the spoils system, argued for government by merit, and was regarded by everyone who met him as the most idealistic reformer of his generation. He had not yet learned that ideals without power are conversation.",
      "In the forty-four years that followed, Robert Moses built 627 miles of road, thirteen bridges, 658 playgrounds and two of the world's great fairs, and he did it without ever once winning an election.",
      "He understood something his contemporaries did not: that authority written into the fine print of a public authority's bond covenants could outlast mayors, governors and public opinion together. He drafted much of that fine print himself, and the legislators who passed it did not read it.",
      "The cost is harder to photograph than the achievement. A quarter of a million people were removed from their homes by his expressways, and the neighbourhoods those roads crossed were selected, again and again, by how little their residents could do about it.",
      "To follow his career is to watch the accumulation of power become an end that consumes the purposes it was assembled to serve, and to notice how much of a city's shape is decided by people whose names appear on no ballot.",
    ],
  },
  {
    id: "RB022", gid: "RaWMEAAAQBAJ", title: "The New Map", author: "Daniel Yergin", year: "2020",
    category: "Science & Environment", subtopics: "Energy | Geopolitics | Climate", pages: 512,
    description: "How shifting energy systems are redrawing the political map, from shale to the electric transition.",
    tags: "energy | geopolitics | climate | oil | transition", related: "RB024 | RB025 | RB018",
    label: "The Shale Era", folio: 11,
    paras: [
      "In 2003 a Texan engineer spent seventeen years and much of his fortune insisting that gas could be freed from shale rock. Geologists told him it was impossible. By 2018 the United States was the world's largest oil producer, and the strategic assumptions of half a century had quietly expired.",
      "Energy maps and political maps have always been drawn on top of each other. Change the location of supply and you change who needs whom, which alliances are cheap to maintain, and which threats can be safely ignored.",
      "The new map has several layers. Shale reordered the Americas. Pipelines and pricing reordered Russia's relations with Europe. Sea lanes and manufactured supply chains now carry as much strategic weight as oilfields, and most of them pass through contested water.",
      "Over all of it sits the climate question, which is not one transition but several running at different speeds: electricity, transport, industry, heat. Each has its own physics, its own capital cycle and its own politics.",
      "What follows is an attempt to hold both stories at once — the continuing dominance of hydrocarbons and the genuine momentum of what will replace them — without pretending the second has already happened.",
    ],
  },
  {
    id: "RB023", gid: "PT22DwAAQBAJ", title: "Braiding Sweetgrass", author: "Robin Wall Kimmerer", year: "2013",
    category: "Science & Environment", subtopics: "Ecology | Nature | Indigenous knowledge", pages: 408,
    description: "A botanist braids scientific and indigenous knowledge into an account of reciprocity with the living world.",
    tags: "ecology | nature | indigenous knowledge | plants | reciprocity", related: "RB024 | RB025 | RB022",
    label: "Skywoman Falling", folio: 6,
    paras: [
      "In the beginning there was Skywoman, who fell from a hole in the sky clutching a handful of seeds. The animals of the water world, seeing her fall, gathered to break it. A great turtle offered its back, a muskrat brought mud from the bottom, and Skywoman danced her thanks until the mud spread into land.",
      "I was taught this story as a child and taught a different origin story at school, in which another woman in another garden is given a tree and an instruction, and is exiled for her curiosity. One story ends with gratitude and a world made together. The other ends with a fence.",
      "I am a botanist, trained to ask how a plant works. I am also a member of the Citizen Potawatomi Nation, taught to ask what a plant has to say. The two questions are not in competition, though the institutions that ask them often are.",
      "The sweetgrass of the title is braided in three strands: the science, the teachings of my people, and the story of one woman trying to bring them together. Braiding requires tension in all three. Let the hand slacken and the whole thing comes loose.",
      "Everything I have learned from plants points to reciprocity. A harvest properly taken increases the stand. Gratitude is not decoration on top of ecology; in the languages of this land it is grammar, and the living world is spoken of as kin rather than as inventory.",
    ],
  },
  {
    id: "RB024", gid: "vi-loAEACAAJ", title: "The Sixth Extinction", author: "Elizabeth Kolbert", year: "2014",
    category: "Science & Environment", subtopics: "Biodiversity | Climate | Environment", pages: 336,
    description: "Field reporting on the mass extinction now under way, and the science that first recognised extinction at all.",
    tags: "biodiversity | climate | extinction | environment | science", related: "RB022 | RB023 | RB025",
    label: "The Sixth Extinction", folio: 8,
    paras: [
      "The town of El Valle de Antón sits in the crater of an extinct volcano, and until about ten years ago it was famous for its frogs. The golden frog was so common that people warned visitors not to step on them. Now there are none in the forest, and the survivors live in tanks behind glass, in a converted hotel, attended by staff who change gloves between rooms.",
      "Five times in the history of life, diversity has collapsed abruptly and globally. The sixth such event is under way now, and its cause is not an asteroid or a shifting continent but a single species that reads.",
      "For most of recorded thought, extinction was not merely undiscovered; it was unthinkable. A creation held to be complete could not be losing parts. It took mastodon bones, a French anatomist and half a century of argument before the idea of a species vanishing became respectable.",
      "The chapters that follow visit thirteen species and the places where their fate is being decided: an acidifying bay off Naples, a limestone quarry holding the end of the Ordovician, a cave in upstate New York filled with the bodies of bats.",
      "What links these stories is speed. Life has always absorbed change; what it cannot absorb is change delivered faster than adaptation runs. That, more than any single pollutant, is the human signature in the fossil record we are currently writing.",
    ],
  },
  {
    id: "RB025", gid: "6aMfnwEACAAJ", title: "Thinking in Systems", author: "Donella H. Meadows", year: "2008",
    category: "Science & Environment", subtopics: "Systems thinking | Complexity | Feedback", pages: 240,
    description: "A short primer on seeing the feedback loops behind climate, cities, economies and everything else that misbehaves.",
    tags: "systems thinking | complexity | feedback | modelling | environment", related: "RB022 | RB023 | RB024",
    label: "The Basics", folio: 11,
    paras: [
      "Managers are not confronted with problems that are independent of each other, but with dynamic situations that consist of complex systems of changing problems that interact with each other. I call such situations messes.",
      "A system is an interconnected set of elements coherently organised in a way that achieves something. It must consist of elements, interconnections and a function or purpose. A pile of sand is not a system; remove a handful and you still have a pile of sand. Remove a component from a bicycle and you have a heap of parts.",
      "The least obvious part of any system, its function or purpose, is often the most crucial determinant of its behaviour. Purposes are deduced from behaviour, not from rhetoric. If a government declares its interest in protecting the environment but allocates little money to it, environmental protection is not the purpose of that system.",
      "Stocks are the memory of a system, and flows are the rates at which they fill and drain. Because stocks change slowly, they act as buffers and delays, and delays are the single most reliable source of the oscillation, overshoot and collapse that surprise people.",
      "The same handful of shapes — reinforcing loops, balancing loops, shifting dominance — turn up in a bathtub, a national economy and a warming planet. Once you can see them, you can also see where a small, well-placed push changes everything.",
    ],
  },
  {
    id: "RB026", gid: "1vcF0QEACAAJ", title: "Make It Stick", author: "Peter C. Brown, Henry L. Roediger III and Mark A. McDaniel", year: "2014",
    category: "Philosophy & Humanities", subtopics: "Learning science | Memory | Education", pages: 336,
    description: "What research on memory and retrieval says about how learning actually works, against how it feels.",
    tags: "learning science | memory | retrieval | education | study", related: "RB027 | RB029 | RB006",
    label: "Learning Is Misunderstood", folio: 4,
    paras: [
      "A pilot loses an engine at eleven thousand feet. He does not deliberate. He runs the memorised procedure, lands the aircraft, and afterwards cannot explain how he knew what to do. The knowledge was not in his notes. It had been retrieved, under pressure, so many times that it had become part of him.",
      "Most of us believe that learning is better when it is easy, and that rereading a text until it feels familiar is a sign of progress. Both beliefs are wrong, and they are wrong in the same way: fluency feels like mastery and is in fact its most convincing counterfeit.",
      "Learning that lasts requires effortful retrieval. Testing yourself, even when you fail, strengthens memory more than any amount of review. Spacing practice out so that a little forgetting occurs makes the next retrieval harder, and therefore more valuable.",
      "Interleaving different problem types feels messy and slows performance during practice, while improving performance on everything that matters afterwards. Massed practice does the reverse, which is why it remains so popular with students and so useless by June.",
      "The uncomfortable conclusion of this research is that the strategies that feel most productive are usually the least, and that the discomfort of difficult practice is not a sign of poor teaching but the sensation of learning taking place.",
    ],
  },
  {
    id: "RB027", gid: "Phj2jZwYDKcC", title: "How Learning Works", author: "Susan A. Ambrose et al.", year: "2010",
    category: "Philosophy & Humanities", subtopics: "Learning science | Teaching | Education", pages: 336,
    description: "Seven research-based principles for teaching, drawn from cognitive and educational psychology.",
    tags: "learning science | teaching | education | motivation | practice", related: "RB026 | RB029 | RB028",
    label: "How Does Prior Knowledge Affect Learning?", folio: 10,
    paras: [
      "A lecturer opens a course on statistics with a poll and discovers that a third of the class believes correlation demonstrates cause. She had planned to begin at chapter one. What she now faces is not an absence of knowledge but the presence of the wrong kind, already organised and already trusted.",
      "Students connect what they learn to what they already know, interpreting incoming information, and even sensory perception, through the lens of their existing knowledge, beliefs and assumptions. This is not an obstacle to teaching; it is the mechanism of it.",
      "Prior knowledge helps when it is activated, sufficient, appropriate and accurate. It hinders when any of those conditions fails — when knowledge from one context is transferred to another where it does not hold, or when a confident misconception simply absorbs the new material and carries on unchanged.",
      "The practical implication is that teaching begins with diagnosis. Brief exercises that make prior knowledge visible cost one class session and repeatedly save a semester.",
      "Each chapter in this book takes one principle, summarises the evidence behind it, and then does the part most research summaries omit: it lists the specific things an instructor can do on Monday morning.",
    ],
  },
  {
    id: "RB028", gid: "H6EIBufi6hwC", title: "Justice", author: "Michael J. Sandel", year: "2009",
    category: "Philosophy & Humanities", subtopics: "Ethics | Political philosophy | Society", pages: 320,
    description: "A tour of the great theories of justice, tested against the hard cases of contemporary public life.",
    tags: "ethics | political philosophy | justice | society | reasoning", related: "RB029 | RB030 | RB004",
    label: "Doing the Right Thing", folio: 5,
    paras: [
      "In the summer of 2004 Hurricane Charley tore across Florida, and afterwards a bag of ice that had cost two dollars cost ten. Hotel rooms tripled. Chainsaw crews asked twenty-three thousand dollars to clear two fallen trees. The state attorney general prosecuted; economists objected that prices were merely doing their job.",
      "The argument that followed was not really about ice. It was about three ideas that recur whenever a society asks what is just: maximising welfare, respecting freedom, and cultivating virtue. Almost every public disagreement you will have this year is a quarrel among them.",
      "Consider the runaway trolley. Five workers will die unless you divert it onto a track where one will die instead. Most people would turn the wheel. Now suppose the only way to stop it is to push a large stranger off a bridge into its path. The arithmetic is identical; almost nobody pushes.",
      "That gap is not a failure of reasoning to be embarrassed about. It is evidence that our moral judgements draw on more than sums, and the philosopher's task is to work out which of our intuitions to trust and which to revise.",
      "Political philosophy begins where the confident answers stop agreeing with one another. This book proceeds by that method: a case, a principle, and then the case that makes the principle uncomfortable.",
    ],
  },
  {
    id: "RB029", gid: "BL2OEAAAQBAJ", title: "The Scout Mindset", author: "Julia Galef", year: "2021",
    category: "Philosophy & Humanities", subtopics: "Reasoning | Belief | Critical thinking", pages: 288,
    description: "On seeing clearly rather than defending a position, and the habits that make accurate thinking possible.",
    tags: "reasoning | belief | critical thinking | bias | judgement", related: "RB026 | RB028 | RB001",
    label: "Two Kinds of Thinking", folio: 7,
    paras: [
      "In 1894 a cleaning woman in the German embassy in Paris recovered a torn memorandum from a wastepaper basket. Within weeks the French army had identified its author as Captain Alfred Dreyfus, on evidence that amounted to a resemblance of handwriting and the fact that he was Jewish. Everything discovered afterwards was interpreted to fit.",
      "The officers were not lying. They were reasoning, energetically and in good faith, in a mode I call the soldier mindset: reasoning as defence. Under that mindset, evidence for a conclusion is welcomed and evidence against it is subjected to interrogation, and both feel like rigour from the inside.",
      "The alternative is the scout mindset: the motivation to see things as they are, not as you wish they were. A scout is not more intelligent than a soldier and is not free of bias. A scout simply wants the map to be accurate, including the parts that are inconvenient.",
      "The difference is emotional before it is intellectual. Soldiers protect self-image, identity and morale. Scouts have found a way to hold those things loosely enough that being wrong costs less than staying wrong.",
      "Most of this book is about the small, practical tests that reveal which mode you are in — the selective sceptic test, the outsider test, the status quo test — and about how to make accuracy cheaper than defence.",
    ],
  },
  {
    id: "RB030", gid: "2Jd5DwAAQBAJ", title: "The Courage to Be Disliked", author: "Ichiro Kishimi and Fumitake Koga", year: "2013",
    category: "Philosophy & Humanities", subtopics: "Philosophy | Psychology | Meaning", pages: 288,
    description: "Adlerian psychology presented as a dialogue on freedom, relationships and the refusal of determinism.",
    tags: "philosophy | psychology | meaning | freedom | relationships", related: "RB028 | RB029 | RB006",
    label: "The First Night", folio: 13,
    paras: [
      "PHILOSOPHER: The world is simple, and life is simple too.",
      "YOUTH: You cannot be serious. The world I live in is a chaos of contradictions, and my own life is the worst of it. I came here to prove you wrong.",
      "PHILOSOPHER: Then let us begin with the friend you mentioned, who has not left his room in years. You believe his past confinement causes his present fear. Adlerian psychology denies trauma in that sense. We are not determined by our experiences; we are determined by the meaning we give them.",
      "YOUTH: So his suffering is his own invention? That is a cruel thing to say to a frightened man.",
      "PHILOSOPHER: It is not cruelty; it is the only version of the story in which he is free. If the past decides the present, no one can change, and every consolation we offer him is a lie. If the goal comes first and the reasons follow, then change is available tonight, and it costs him only the willingness to be disliked.",
    ],
  },
];

function split(v: string): string[] {
  return v.split("|").map((x) => x.trim()).filter(Boolean);
}

export const LIBRARY: RBook[] = SEEDS.map((s, i) => ({
  id: s.id,
  gid: s.gid,
  title: s.title,
  author: s.author,
  year: s.year,
  category: s.category,
  subtopics: split(s.subtopics),
  language: "English",
  pages: s.pages,
  description: s.description,
  tags: split(s.tags),
  related: split(s.related),
  cover: `https://books.google.com/books/content?id=${s.gid}&printsec=frontcover&img=1&zoom=2&source=gbs_api`,
  thumb: `https://books.google.com/books/content?id=${s.gid}&printsec=frontcover&img=1&zoom=1&source=gbs_api`,
  link: `https://books.google.com/books/about/?id=${s.gid}`,
  style: i % STYLES.length,
  ...(s.label ? { label: s.label } : {}),
  folio: s.folio,
  paras: s.paras,
}));

export const LIBRARY_BY_ID: Record<string, RBook> = Object.fromEntries(
  LIBRARY.map((b) => [b.gid, b]),
);
