import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'
import { richTextFromBlocks, type ContentBlock } from '../lib/lexical'
import { POST_FAQS } from '../lib/postFaqs'
import type { Post } from '../payload-types'

/**
 * Companion SEO blogs for three newsletter issues that shipped without one.
 *
 * Same division of labour as `camp-story-blogs.ts` and `classroom-blogs.ts`: the issue owns the
 * personal, experiential angle, the blog owns the broad parent query, so the two never
 * cannibalise each other.
 *
 *  - `when-a-child-says-i-am-not-good-at-maths` (issue)  <->  `maths-anxiety-in-children` (blog)
 *  - `when-your-child-gets-a-bad-grade` (issue)          <->  `how-to-help-a-child-struggling-at-school` (blog)
 *  - `emotional-intelligence-in-the-classroom` (issue)   <->  `emotional-intelligence-for-kids` (blog)
 *
 * Photos are the newsletter photographs, already optimised, so this seed adds no new files.
 * Body copy lives in `sections`; `content` carries only the internal-link row. The FAQ section in
 * each body is rendered FROM `POST_FAQS`, so the visible copy and the FAQPage JSON-LD can never
 * drift apart.
 *
 * Run: `PAYLOAD_SKIP_PUSH=1 pnpm run seed:companion-blogs` (local .env points at PRODUCTION).
 */
const PBN = '/images/newsletter/people-behind-nucleus'
const CBT = '/images/newsletter/teachers-cbt'

type SeedImage = { imageUrl: string; alt: string; caption?: string; portrait?: boolean }
type SeedSection = {
  heading?: string
  style?: 'auto' | 'highlight' | 'gallery'
  body: ContentBlock[]
  images?: SeedImage[]
}

type SeedPost = {
  title: string
  slug: string
  category: 'news' | 'academics' | 'admissions' | 'campus-life' | 'parent-resources'
  excerpt: string
  heroImageUrl: string
  publishedAt: string
  meta: { title: string; description: string }
  sections: SeedSection[]
  related: { label: string; url: string }[]
}

const faqBody = (slug: string): ContentBlock[] =>
  (POST_FAQS[slug] ?? []).map((f) => ({ p: `${f.q} ${f.a}` }))

const posts: SeedPost[] = [
  /* ------------------------------------------------------------------------------
   * 1. Maths anxiety in children
   * ---------------------------------------------------------------------------- */
  {
    title: 'Maths Anxiety in Children: Signs, Causes and How Parents Can Help',
    slug: 'maths-anxiety-in-children',
    category: 'parent-resources',
    excerpt:
      'Maths anxiety is a feeling about the subject, not a measure of ability. Here are the signs to look for, where it comes from, what to say at home when your child says “I am just not good at maths”, and what a good school does about it.',
    heroImageUrl: `${PBN}/pbn01-rajif-classroom.webp`,
    publishedAt: '2026-10-09T07:00:00.000Z',
    meta: {
      title: 'Maths Anxiety in Children: How to Help',
      description:
        'The signs of maths anxiety in children, why it starts, and what parents in Addis Ababa can do at home, with advice from a physicist who teaches maths.',
    },
    sections: [
      {
        body: [
          {
            p: 'Somewhere between Grade 2 and Grade 6, many children decide something about themselves. They are not a maths person. The numbers do not make sense to them, and they never will.',
          },
          {
            p: 'It is one of the most common things a parent hears, and one of the most expensive. A child who has decided they are bad at maths stops trying, which guarantees the next result is worse, which proves the decision right. The feeling has a name: maths anxiety.',
          },
          {
            p: 'This guide explains what maths anxiety is, how to spot it, where it comes from and what actually helps. Much of it comes from Rajif, who teaches mathematics at Nucleus International Schools in Addis Ababa and holds an M.Sc. in Materials Physics. We use his own words where they say it best.',
          },
        ],
        images: [
          {
            imageUrl: `${PBN}/pbn01-rajif-classroom.webp`,
            alt: 'Rajif preparing a lesson at his desk in the mathematics classroom at Nucleus International Schools, Addis Ababa',
            caption: 'Rajif planning a lesson beneath the number walls in the Nucleus maths classroom.',
          },
        ],
      },
      {
        heading: 'What is maths anxiety in children?',
        body: [
          {
            p: 'Maths anxiety is a real feeling of tension, worry or dread that appears when a child faces maths, out of proportion to how able they are. It is a reaction to the subject, not a verdict on intelligence.',
          },
          {
            p: 'That distinction matters. A child can be perfectly capable and still freeze in a test, because the fear takes up the space the thinking needed. Anxious children often know more than their paper shows. They can explain a method at the kitchen table and lose it completely when a timer starts.',
          },
          {
            p: 'It also differs from simply finding a topic hard. Hard is normal. Hard is how learning feels from the inside. Anxiety is when the child begins to avoid the difficulty rather than work through it.',
          },
        ],
      },
      {
        heading: 'What are the signs of maths anxiety?',
        body: [
          {
            p: 'It rarely announces itself. Look for patterns that repeat over several weeks:',
          },
          {
            ul: [
              'Stomach aches, headaches or sudden tiredness on days with a maths lesson or test.',
              'Putting maths homework off until last, or finding a reason to do something else first.',
              'Rubbing out answers over and over, or refusing to write anything unless they are sure.',
              'Going blank in tests on work they could do the day before.',
              'Saying “I am just not good at maths”, “I hate it” or “I will never get it”.',
              'Copying a method without any idea why it works, because understanding feels risky.',
              'Tears, irritability or silence when the books come out.',
            ],
          },
          {
            p: 'One bad afternoon means nothing. A child who shows several of these across a month is telling you something.',
          },
        ],
      },
      {
        heading: 'Where does maths anxiety come from?',
        body: [
          {
            p: 'There is rarely one cause. The usual contributors are ordinary and fixable:',
          },
          {
            ul: [
              'A gap in an early topic. Maths builds in layers, so a missed idea in fractions or place value quietly weakens everything above it.',
              'Speed over understanding. When the first question a child hears is “how fast?” they learn that hesitation is failure.',
              'Being wrong in public. One embarrassing moment at the board can last years.',
              'Adults who joke about it. “I was never good at maths either” sounds harmless and gives the child permission to give up.',
              'High stakes too early. A child who treats every test as a judgement on their worth has no room to experiment.',
            ],
          },
          {
            p: 'Notice that none of these is about the child’s ability. That is the good news. Every item on the list can be changed.',
          },
        ],
      },
      {
        heading: 'Can you be born bad at maths?',
        style: 'highlight',
        body: [
          {
            p: 'No. Rajif is direct about it: “Being good at mathematics is not something a child is born with. It develops through practice, curiosity and a willingness to keep trying.”',
          },
          {
            p: 'Children differ in how quickly an idea lands, just as they do in learning to read or ride a bicycle. Nobody is born unable. The belief that you are, repeated often enough, is the actual obstacle.',
          },
          {
            p: 'He describes the most rewarding moment in his job as the one when a student moves from “I cannot do this” to “wait, I think I understand”. That moment is available to almost every child. It just does not arrive on a deadline.',
          },
        ],
      },
      {
        heading: 'What should I say when my child says “I am just not good at maths”?',
        body: [
          {
            p: 'Resist the urge to reassure. “Of course you are, you are very clever” does not work, because the child knows what they feel. It also teaches them that being clever is the point, which makes mistakes more frightening.',
          },
          {
            p: 'Try something closer to this instead:',
          },
          {
            ul: [
              'Name the feeling. “That sounds frustrating. Show me where it stopped making sense.”',
              'Add one small word. “You are not good at this yet.”',
              'Point to evidence. “Last week you worked out the whole pattern. How did you do that?”',
              'Ask for the thinking. “What do you know so far?”',
            ],
          },
          {
            p: 'The aim is to move the conversation from a fixed fact about the child to a problem the two of you can look at together.',
          },
        ],
      },
      {
        heading: 'What parents can do at home',
        body: [
          {
            p: 'You do not need to understand the method. You need to be a calm adult who treats the work as interesting. These habits do the most good:',
          },
          {
            ul: [
              'Use the three questions. Rajif wants every student to be able to ask what do I know, what do I not know, and what could I try. Put them on the fridge and ask them in that order whenever your child is stuck.',
              'Treat a wrong answer as information. As Rajif puts it, “A wrong answer shows us exactly where the thinking needs to change.” Ask where it went wrong, not why it was wrong.',
              'Keep sessions short. Fifteen calm minutes beat an hour of tears. Stop on a small success if you can.',
              'Find maths in ordinary life. Ask your child to work out the change at the shop, halve a recipe or estimate how long a taxi ride will take.',
              'Praise effort and strategy. “You tried three ways before it worked” builds more than “you got it right”.',
              'Never joke that you were bad at it too. If you were, say it differently: “I found it hard, and I wish someone had shown me this way.”',
            ],
          },
          {
            p: 'If you want the full version of Rajif’s thinking, including why he asks students to explain rather than recite, it is in the interview that sits behind this guide.',
          },
        ],
        images: [
          {
            imageUrl: `${PBN}/pbn01-rajif-portrait.webp`,
            alt: 'Rajif, mathematics teacher at Nucleus International Schools in Addis Ababa',
            caption: 'Rajif, Mathematics Teacher. M.Sc. in Materials Physics, PhD candidate.',
            portrait: true,
          },
        ],
      },
      {
        heading: 'What a good school does about maths anxiety',
        body: [
          {
            p: 'Home can only do half of this. The other half happens in the classroom, and it is worth knowing what to look for when you visit a school.',
          },
          {
            p: 'A school that handles maths anxiety well gives students small successes that build confidence one step at a time. It makes mistakes safe to make, and it asks for reasoning as well as answers: where can we see this in real life, what happens if we change something, is there another way to solve it.',
          },
          {
            p: 'That is the approach Rajif brings to Nucleus. He asks students to understand why a method works rather than only memorise it, and he wants them to leave knowing how to approach something they do not understand. In his words, “If a student learns how to learn, that is a success.”',
          },
          {
            p: 'It is also why mathematics sits well inside the international Cambridge curriculum. The Cambridge Primary stage builds maths in careful steps and expects children to explain their thinking, which suits a child who needs to see the idea rather than just be told the rule. It connects naturally to the habits described in our guide to teaching critical thinking and problem solving in Ethiopia.',
          },
        ],
      },
      {
        heading: 'Questions parents ask about maths anxiety',
        body: faqBody('maths-anxiety-in-children'),
      },
      {
        heading: 'Where this happens at Nucleus',
        style: 'highlight',
        body: [
          {
            p: 'Nucleus International Schools is an international school in Addis Ababa teaching the international Cambridge curriculum from age 2 through Grade 8. Rajif teaches mathematics here, and every child in his room is known by name.',
          },
          {
            p: 'For his full account of why no child is born bad at maths, and what he asks a student who is stuck, read the first issue of The People Behind Nucleus. To see a classroom in person, or to ask what a week of maths looks like, call 09 81 99 99 22 or begin the registration form.',
          },
        ],
      },
    ],
    related: [
      {
        label: 'Rajif on why no child is born bad at maths',
        url: '/newsletter/when-a-child-says-i-am-not-good-at-maths',
      },
      {
        label: 'Teaching critical thinking and problem solving in Ethiopia',
        url: '/news/teaching-critical-thinking-problem-solving-ethiopia',
      },
      { label: 'The Cambridge pathway at Nucleus', url: '/cambridge-pathway' },
      { label: 'Meet the team at Nucleus', url: '/about' },
      { label: 'Register your child at Nucleus', url: '/register' },
    ],
  },

  /* ------------------------------------------------------------------------------
   * 2. Child struggling at school / bad grades
   * ---------------------------------------------------------------------------- */
  {
    title: 'How to Help a Child Who Is Struggling at School: A Parent’s Guide',
    slug: 'how-to-help-a-child-struggling-at-school',
    category: 'parent-resources',
    excerpt:
      'A bad grade, a falling report or a child who says school is pointless. Here is how to find the real cause, what to say at home, how to work with the teacher, and what a School Director with four decades in classrooms tells parents.',
    heroImageUrl: `${PBN}/pbn02-daniel-thinking.webp`,
    publishedAt: '2026-10-09T08:00:00.000Z',
    meta: {
      title: 'Help a Child Struggling at School',
      description:
        'How to help a child who is struggling or falling behind at school: find the cause, talk it through, work with the teacher. Advice from a School Director.',
    },
    sections: [
      {
        body: [
          {
            p: 'The report arrives, or the test paper comes home, and the number is lower than anyone expected. Your child goes quiet. You feel a mixture of worry, frustration and something close to guilt.',
          },
          {
            p: 'What happens in the next hour matters more than the grade itself. A child who is met with calm interest tends to try again. A child who is met with disappointment tends to hide the next paper.',
          },
          {
            p: 'This guide is for any parent whose child is struggling at school: one bad result, a slow slide, or a growing sense that they have given up. It draws on the thinking of Daniel Hiest, School Director at Nucleus International Schools, who has spent more than four decades in education in Europe, Africa, South America and Canada.',
          },
        ],
        images: [
          {
            imageUrl: `${PBN}/pbn02-daniel-thinking.webp`,
            alt: 'Daniel Hiest, School Director at Nucleus International Schools, at his desk reading through student work',
            caption: 'Daniel Hiest, School Director: “There is always a path forward.”',
          },
        ],
      },
      {
        heading: 'Why is my child struggling at school?',
        body: [
          {
            p: 'Before fixing anything, find out what is actually wrong. A drop in results is a symptom, and several quite different problems produce the same number on a page.',
          },
          {
            ul: [
              'A missing foundation. A topic from last year was never fully understood and everything built on it now wobbles.',
              'A single difficult subject. Strong in most things, lost in one. This is the easiest problem to help.',
              'Lost confidence. The child can do the work and no longer believes it, so they stop trying.',
              'Practical causes. Tiredness, poor sleep, hunger, a change of school, a new teacher or a long commute.',
              'Worry outside school. Something at home or with friends is taking up the space learning needs.',
              'A learning difficulty nobody has named yet. This is less common, but it is the one worth ruling out if the pattern is long and unexplained.',
            ],
          },
          {
            p: 'Notice that “lazy” is not on the list. Children who look lazy are usually avoiding something that feels impossible.',
          },
        ],
      },
      {
        heading: 'What should I do when my child gets a bad grade?',
        body: [
          {
            p: 'Do less than you want to, and do it more slowly. Ask your child what they think happened before you offer your view. Then look at the paper together, with curiosity rather than a verdict.',
          },
          {
            p: 'Daniel’s approach is plain: a grade matters because it shows what a student has understood and where further work is needed. It should not become a permanent label or place a limit on a child’s ambitions.',
          },
        ],
      },
      {
        heading: 'Does a bad grade define my child?',
        style: 'highlight',
        body: [
          {
            p: 'No, and the person leading a school should be able to say it plainly. Daniel does: “The grade does not define the person. It is simply a stepping stone to the next level of achievement.”',
          },
          {
            p: 'This does not mean lowering the bar. Daniel is clear that the answer is not to make education easier. It means identifying where a student is struggling, providing effective support and expecting that student to continue working towards a higher standard.',
          },
          {
            p: 'He puts it in a sentence worth repeating at home: “There is always a path forward.”',
          },
        ],
      },
      {
        heading: 'How do I talk to my child about school?',
        body: [
          {
            p: 'The conversation does more good at a quiet moment than at the door when the paper comes out. A walk, a drive or washing up together all work better than a formal sit-down.',
          },
          {
            ul: [
              'Start with what they enjoy at school, so the first question is not about the problem.',
              'Ask open questions. “What was the hardest part?” gets a better answer than “why did you do so badly?”',
              'Listen for the feeling underneath. “I do not care” often means “I am afraid of caring and failing”.',
              'Keep high expectations and say so, in the same breath as your support. Both are true.',
              'End with one small thing to try, not a list of resolutions.',
            ],
          },
        ],
      },
      {
        heading: 'How do I motivate a child who is falling behind?',
        body: [
          {
            p: 'Motivation follows progress, not the other way round. A child who cannot see a way forward stops trying, so the job is to make the next step small enough to finish.',
          },
          {
            p: 'Pick one topic and one measurable target for the next two weeks, such as finishing one chapter of corrections or learning one set of facts properly. Celebrate completion of that, however small. Then choose the next step. Over a term, small steps become a very different report.',
          },
          {
            p: 'Avoid comparison. Brothers, sisters and cousins make a struggling child feel more alone. Compare them only with themselves a month ago.',
          },
        ],
      },
      {
        heading: 'What parents can do at home',
        body: [
          {
            ul: [
              'Protect the basics. Regular sleep, a proper breakfast and a calm place to work are not extras. A tired child cannot learn.',
              'Make a short, steady routine. Twenty minutes every evening beats a long weekend session.',
              'Praise effort, strategy and improvement, not just the result.',
              'Read together, or read the same book, even for older children. It builds vocabulary and gives you an easy way to talk.',
              'Keep your own tone steady. Your child reads your face before they read the number.',
              'Remember what school is for. Daniel wants students to ask good questions, examine evidence, solve problems and think independently, which grows from curiosity at home as much as from lessons.',
            ],
          },
        ],
      },
      {
        heading: 'How should I work with my child’s teacher?',
        body: [
          {
            p: 'Go early and go as a partner. Teachers see your child in a different setting and often notice things you do not.',
          },
          {
            p: 'Useful questions to bring: Where exactly is my child finding this hard? What support is already in place? What can I do at home that matches what you are doing in class? How will we know in a few weeks whether it is working?',
          },
          {
            p: 'A good school will welcome these questions. Daniel’s description of the Director’s role includes recognising where students need additional support and ensuring that they continue progressing. If you cannot get clear answers, that is useful information too.',
          },
        ],
      },
      {
        heading: 'Should I worry about AI and homework help?',
        body: [
          {
            p: 'Many parents now ask whether to allow AI tools while a child is struggling. Daniel’s view is balanced: technology and artificial intelligence have a place in school, and young people need to know how to use them well, but they are tools, not the purpose of education.',
          },
          {
            p: 'A tool that hands over the answer gives speed without understanding. A child who is already behind needs the opposite. If your child uses one, ask them to explain the answer back to you in their own words. If they cannot, the learning has not happened yet.',
          },
        ],
      },
      {
        heading: 'What a good school does when a child falls behind',
        body: [
          {
            p: 'You are entitled to expect a clear response. In practice that means a teacher who knows your child by name, finds the specific gap, offers support that is matched to it, and keeps expecting more.',
          },
          {
            p: 'It also means attention to the child as well as the marks. Daniel returns often to a belief he has held for decades: “Education, without an education of the heart, is no education at all.” At Nucleus that means combining academic ambition with the judgement and character to use education responsibly.',
          },
          {
            p: 'The international Cambridge curriculum helps because it is built in clear stages, so a school can see exactly where a child’s understanding stopped and begin again from there. If you are comparing schools, our guide to choosing an international school in Addis Ababa lists the questions worth asking about support.',
          },
        ],
      },
      {
        heading: 'Questions parents ask about children who struggle at school',
        body: faqBody('how-to-help-a-child-struggling-at-school'),
      },
      {
        heading: 'Where this happens at Nucleus',
        style: 'highlight',
        body: [
          {
            p: 'Nucleus International Schools teaches the international Cambridge curriculum from age 2 through Grade 8 in Mekanisa, Addis Ababa. Daniel Hiest leads the school as School Director, and his belief that there is always a path forward shapes how we respond when a student is discouraged by a result.',
          },
          {
            p: 'His full interview, including what he means by an education of the heart, is in the second issue of The People Behind Nucleus. To visit a classroom or talk through your child’s situation, call 09 81 99 99 22 or start the registration form.',
          },
        ],
      },
    ],
    related: [
      {
        label: 'Our School Director on what comes after a bad grade',
        url: '/newsletter/when-your-child-gets-a-bad-grade',
      },
      {
        label: 'How to choose an international school in Addis Ababa',
        url: '/news/how-to-choose-international-school-addis-ababa',
      },
      { label: 'The Cambridge pathway at Nucleus', url: '/cambridge-pathway' },
      { label: 'Meet the leadership team at Nucleus', url: '/about' },
      { label: 'Register your child at Nucleus', url: '/register' },
    ],
  },

  /* ------------------------------------------------------------------------------
   * 3. Emotional intelligence for kids
   * ---------------------------------------------------------------------------- */
  {
    title: 'Emotional Intelligence for Kids: What It Is and How to Build It',
    slug: 'emotional-intelligence-for-kids',
    category: 'academics',
    excerpt:
      'Emotional intelligence is the skill behind calm classrooms, kind friendships and children who bounce back. Here is what it means, how schools teach social and emotional learning, and what parents in Addis Ababa can practise at home.',
    heroImageUrl: `${CBT}/cbt01-ei-session.webp`,
    publishedAt: '2026-10-09T09:00:00.000Z',
    meta: {
      title: 'Emotional Intelligence for Kids Explained',
      description:
        'What emotional intelligence is, how schools teach social and emotional learning, and simple ways parents in Addis Ababa can build it at home.',
    },
    sections: [
      {
        body: [
          {
            p: 'Every parent has seen it. Two children get the same difficult sum, the same unfair-feeling decision from a teacher, the same argument in the playground. One comes home upset but steady, and talks about it. The other either explodes or goes silent for a day.',
          },
          {
            p: 'The difference is rarely intelligence. It is emotional intelligence: the ability to notice what you are feeling, manage it, and understand what other people are feeling too.',
          },
          {
            p: 'This guide explains emotional intelligence in plain terms, what social and emotional learning looks like inside a good school, and the small habits that build it at home. Much of it comes from the first session of our Teachers’ Capacity Building Training at the Vatican campus, where Nucleus teachers worked through exactly these ideas.',
          },
        ],
        images: [
          {
            imageUrl: `${CBT}/cbt01-ei-session.webp`,
            alt: 'A facilitator leading the Emotional Intelligence session for Nucleus teachers at the Vatican campus',
            caption: 'The first Capacity Building Training session for Nucleus teachers, Vatican Campus.',
          },
        ],
      },
      {
        heading: 'What is emotional intelligence in children?',
        body: [
          {
            p: 'Emotional intelligence is a child’s ability to notice and name their own feelings, manage them, understand how others feel, and act sensibly and kindly as a result. It has three parts that matter most in a school day:',
          },
          {
            ul: [
              'Self-awareness: knowing “I am frustrated” before the frustration turns into shouting.',
              'Self-regulation: calming down enough to think, ask for help or try again.',
              'Empathy: noticing that the quiet child at the next desk is upset, and responding with care.',
            ],
          },
          {
            p: 'None of this is soft. A child who can do these three things sits through a hard lesson, takes feedback, works in a group and recovers from a bad result. A child who cannot has to spend their energy elsewhere.',
          },
        ],
      },
      {
        heading: 'Why is emotional intelligence important for learning?',
        style: 'highlight',
        body: [
          {
            p: 'Our teacher training begins from a simple idea: teaching is an emotional endeavour as much as an intellectual one. Before a student can learn from a teacher, they must feel safe, seen and understood by that teacher.',
          },
          {
            p: 'The same is true at home. A frightened or ashamed child cannot take in a new idea, however well it is explained. A settled child can.',
          },
          {
            p: 'That is why the training treats emotional skills as part of academic performance and not a separate programme beside it. Short emotional check-ins built into daily lessons are linked to more academic endurance, resilience and better exam performance.',
          },
        ],
        images: [
          {
            imageUrl: `${CBT}/cbt01-participants.webp`,
            alt: 'Nucleus teachers taking notes during the Emotional Intelligence module of the Capacity Building Training',
            caption: 'Teachers from across the school, working through the module together.',
          },
        ],
      },
      {
        heading: 'What is social and emotional learning in schools?',
        body: [
          {
            p: 'Social and emotional learning, often shortened to SEL, means teaching children to understand their feelings, build empathy and work well with others as part of ordinary school life. It is not a poster in the corridor or a lesson squeezed into Friday afternoon.',
          },
          {
            p: 'In a school that does it properly, you see it in small things. A lesson starts with a quick check-in on how the class is feeling. A teacher responds to a disruption by asking what is behind it. Classmates are taught how to disagree without hurting each other.',
          },
          {
            p: 'Our training for teachers pulled three practical ideas out of the first session:',
          },
          {
            ul: [
              'Self-awareness is a teaching tool. Good teachers recognise their own emotional triggers, and when they regulate their own state, they help their students regulate theirs.',
              'Empathy is classroom management. Disruptive behaviour is often a request for support, and empathy lets a teacher address the root cause without damaging the relationship.',
              'Social and emotional learning belongs in the lesson. Short emotional check-ins woven into daily teaching do more than a separate course.',
            ],
          },
        ],
      },
      {
        heading: 'What is the 10-second pause?',
        body: [
          {
            p: 'One habit from the training is worth borrowing at home. Before responding to a difficult behavioural moment, take a full ten seconds. Ask yourself: am I reacting out of frustration, or responding to help this child learn?',
          },
          {
            p: 'It costs ten seconds, and it changes a teacher’s posture from reactive to responsive. Students feel the difference immediately.',
          },
          {
            p: 'Parents can use it just as well. Your child spills the ink, or lies about the homework, or slams the door. Count to ten, then answer the child rather than the incident. Children learn to regulate by watching adults they trust do it.',
          },
        ],
        images: [
          {
            imageUrl: `${CBT}/cbt01-group-activity.webp`,
            alt: 'Nucleus staff working through a group activity on a whiteboard during the training session',
            caption: 'Working the ideas through as a group, not just hearing them.',
          },
        ],
      },
      {
        heading: 'How do you teach emotional intelligence to kids at home?',
        body: [
          {
            p: 'You do not need a programme. You need a few steady habits:',
          },
          {
            ul: [
              'Name feelings out loud. “You look disappointed” gives a child the words they do not yet have.',
              'Separate the feeling from the behaviour. All feelings are acceptable. Hitting, shouting and sulking for hours are not. Say both.',
              'Ask what is underneath. A refusal to do homework is often worry, tiredness or a gap in understanding.',
              'Model it. Say “I am frustrated, so I am going to take a minute” when you are. Children copy what they watch.',
              'Ask about other people. “How do you think she felt when that happened?” builds empathy better than a lecture on kindness.',
              'Protect mistakes. When a child recovers from one at home, say so. Resilience grows from recoveries, not from being spared.',
            ],
          },
          {
            p: 'A few minutes at bedtime is enough: one good thing, one hard thing, and how each felt.',
          },
        ],
      },
      {
        heading: 'At what age should children start learning about emotions?',
        body: [
          {
            p: 'From the earliest years. A toddler can learn that “sad” and “cross” are different words. A preschooler can learn that a friend’s tears mean something. The skills then deepen through primary and secondary school.',
          },
          {
            p: 'That is one reason a connected school journey helps. At Nucleus, children join from age 2 and follow one planned pathway through Grade 8 on the international Cambridge curriculum, so habits learned in the early years are still being built on at Cambridge Primary level and beyond, rather than starting again at each transfer.',
          },
        ],
      },
      {
        heading: 'Does emotional intelligence matter more than grades?',
        body: [
          {
            p: 'It is the wrong comparison. Emotional skills are what let a child turn ability into results: staying with a hard problem, asking for help, accepting a correction and working with others.',
          },
          {
            p: 'It also reaches beyond school. Our founder’s argument is that Ethiopian graduates too often leave school unable to think, create or solve problems, and that begins in classrooms that reward reproducing material. Children who can manage themselves and understand others are far better placed for that world. We explore the wider point in our guide to teaching critical thinking and problem solving in Ethiopia.',
          },
        ],
      },
      {
        heading: 'Questions parents ask about emotional intelligence',
        body: faqBody('emotional-intelligence-for-kids'),
      },
      {
        heading: 'Where this happens at Nucleus',
        style: 'highlight',
        body: [
          {
            p: 'Nucleus International Schools is an international school in Addis Ababa, teaching the international Cambridge curriculum from age 2 through Grade 8. Emotional intelligence was the subject of the first session in our Teachers’ Capacity Building Training, held at the Vatican campus, because we believe a child must feel safe, seen and understood before they can learn.',
          },
          {
            p: 'The full account of that session, including the three takeaways and the 10-second pause, is in the first issue of our teacher training newsletter. To see how a Nucleus classroom feels, call 09 81 99 99 22 or begin the registration form.',
          },
        ],
      },
    ],
    related: [
      {
        label: 'Inside our first teacher training session on emotional intelligence',
        url: '/newsletter/emotional-intelligence-in-the-classroom',
      },
      {
        label: 'How summer camp builds confidence in children',
        url: '/news/how-summer-camp-builds-confidence-in-children',
      },
      { label: 'The Cambridge pathway at Nucleus', url: '/cambridge-pathway' },
      { label: 'Meet the team at Nucleus', url: '/about' },
      { label: 'Register your child at Nucleus', url: '/register' },
    ],
  },
]

const run = async () => {
  const payload = await getPayload({ config })

  for (const post of posts) {
    await payload.delete({ collection: 'posts', where: { slug: { equals: post.slug } } }).catch(() => {})

    await payload.create({
      collection: 'posts',
      data: {
        title: post.title,
        slug: post.slug,
        category: post.category,
        excerpt: post.excerpt,
        heroImageUrl: post.heroImageUrl,
        publishedAt: post.publishedAt,
        meta: post.meta,
        // Only the internal-link row: the readable body lives in `sections` so the photos
        // sit inside the article. Putting the copy in both would duplicate it on the page.
        content: richTextFromBlocks([{ related: post.related }]) as unknown as Post['content'],
        sections: post.sections.map((s) => ({
          heading: s.heading,
          style: s.style ?? 'auto',
          body: richTextFromBlocks(s.body) as unknown as Post['content'],
          images: (s.images ?? []).map((img) => ({
            imageUrl: img.imageUrl,
            alt: img.alt,
            caption: img.caption,
            portrait: img.portrait ?? false,
          })),
        })),
        _status: 'published',
      },
    })
    console.log('seeded blog:', post.slug)
  }

  process.exit(0)
}

run()
