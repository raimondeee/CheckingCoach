// All content is drawn from two sources only:
//  V = Wayne Blatt "Body Checking Fundamentals" video (timestamps from source-notes.md)
//  M = USA Hockey "Checking the Right Way for Youth Hockey" manual
export const VIDEO = 'https://www.youtube.com/watch?v=qQGgKYFZKs4'

export type Diagram = 'dangerZone' | 'angling' | 'dGap'
export interface Lesson {
  id: number; title: string; emoji: string; t: number; tLabel: string
  points: string[]; why?: string; diagram?: Diagram; extraWatch?: { t: number; label: string }[]; gates: number
}
export interface Question { id: string; lesson: number; q: string; choices: string[]; answer: number; why: string; src: string }

export const LESSONS: Lesson[] = [
  { id: 1, title: 'Contact vs. Checking', emoji: '🤝', t: 22, tLabel: '0:22', gates: 2,
    points: [
      '<b>Body contact</b> happens all over the rink, even in non-checking leagues. Players near the puck can lean into each other while they play the puck.',
      '<b>Body checking</b> is going in <i>on purpose</i> to separate a player from the puck. It is introduced around PeeWee / Bantam.',
      'The goal of a check is to <b>get the puck</b>, not to punish or scare anyone.',
      'Awareness: keep your <b>head up</b> and look all around (360°) so you know where players and hits are coming from.'] },
  { id: 2, title: 'Hockey Third Position', emoji: '⛸️', t: 68, tLabel: '1:08', gates: 2,
    points: [
      'Athletic stance: <b>head up, knees bent, shoulders over knees</b>.',
      'Stay on the <b>balls of your feet</b>. On your heels you go down. Too far up on your toes and it’s hard to stay up.',
      'The manual calls the stable version the <b>tripod stance</b>: feet a little wider than your shoulders, stick on the ice with two hands as a “third leg,” knees bent deep.'],
    why: 'Why? Being on the balls of your feet gives you <b>balance</b>, so you can take a hit <i>or</i> give one. Your <b>power comes from your legs</b>.' },
  { id: 3, title: 'Your Three Tools', emoji: '🧰', t: 100, tLabel: '1:40', gates: 3,
    points: [
      '<b>Shoulder</b>, either side.',
      '<b>Hips</b>.',
      '<b>Hands</b>, but only <b>both hands together</b>. One hand or a swinging arm is <b>roughing</b>.',
      'The USA Hockey manual is stricter for legal body checks: use the <b>trunk of your body (hips and shoulders)</b>. Never the elbow, forearm, or stick, and it says pushing with your hands should not be used in youth hockey. When in doubt, use shoulder and hip.',
      'Hit in <b>front</b>: aim your shoulder at his <b>hands and stick</b> to separate him from the puck, then get the puck moving.',
      '<b>Timing</b> matters a lot: if you come in too early and get caught, you go down. Push with your legs, shoulder to shoulder.'] ,
    extraWatch: [{ t: 254, label: 'Hit in front (4:14)' }] },
  { id: 4, title: 'Safety First', emoji: '🛡️', t: 155, tLabel: '2:35', gates: 4, diagram: 'angling',
    points: [
      '<b>Head:</b> don’t lead with your head, and never hit an opponent’s head (that can mean a suspension). Lead with your shoulder, head away. Watch your follow-through, because an elbow coming up can hit the head.',
      '<b>Stick:</b> keep it low and out of the way. Otherwise it’s high-sticking.',
      '<b>Never from behind.</b> The numbers rule: if you can see the <b>numbers on the back of his jersey, don’t hit</b>. You can still pin him.',
      '<b>No knees or legs:</b> if he cuts back, do NOT stick out a knee, leg, or arm. It causes knee-on-knee injuries and penalties.',
      '<b>Angling:</b> don’t skate straight at the puck carrier, because that gives him options. Come in on an angle to push him one way, then make the play.',
      '<b>Timing:</b> don’t go 100 mph in open ice. Angle and time it.'],
    extraWatch: [{ t: 314, label: 'Never from behind (5:14)' }, { t: 353, label: 'Angling (5:53)' }, { t: 421, label: 'Open-ice timing (7:01)' }] },
  { id: 5, title: 'The Danger Zone', emoji: '⚠️', t: 592, tLabel: '9:52', gates: 4, diagram: 'dangerZone',
    points: [
      'The <b>danger zone</b> is about <b>3 feet off the boards</b>, all the way around the rink (half a stick to a stick length).',
      'Getting hit there means getting slammed into the boards. Two choices: <b>get OUT</b> (cut to the middle) or <b>get TIGHT</b> to the boards.',
      '<b>Keep your feet moving.</b> Don’t glide like a “sitting duck.”',
      'You can <b>counter-hit</b> and push back, even with the puck.',
      'Players get hurt when they <b>freeze or open up</b> (turn their shoulder or back). Stay aware, stay in good position, keep your feet moving.',
      'Manual tip when taking a hit on the boards: hip and skate against the boards, brace with your arm on the glass, lean into the checker, tighten up.'],
    extraWatch: [{ t: 627, label: 'Feet moving (10:27)' }, { t: 695, label: 'Receiving contact (11:35)' }] },
  { id: 6, title: 'Debrief and Practice', emoji: '🏆', t: 745, tLabel: '12:25', gates: 2, diagram: 'dGap',
    points: [
      'Recap: contact vs. checking, stance, three tools, safety, danger zone.',
      'Defense 1-on-1: line up your <b>shoulder to his shoulder</b>, stick in the middle, ride him to the wall. Be patient and let it come. The goal is <b>separation</b>, not knocking him down.',
      'Checking is a <b>hockey skill</b>. The only way to get better is <b>practice</b>, even at home with a parent or sibling, giving and taking contact.',
      'Start with small bumps to get comfortable with contact, not big hits.'],
    extraWatch: [{ t: 491, label: 'D 1-on-1 (8:11)' }, { t: 208, label: 'Bump drill (3:28)' }] },
]

const V = (ts: string) => `Video ${ts}`
const M = (p: string) => `USA Hockey manual p.${p}`
type Q = Omit<Question, 'id'>
const raw: Q[] = [
  // Lesson 1
  { lesson: 1, q: 'What is body CHECKING?', choices: ['Any bump that happens near the puck', 'Going in on purpose to separate a player from the puck', 'Hitting someone to scare them', 'Leaning on a player after a whistle'], answer: 1, why: 'Checking is a deliberate move to separate the player from the puck. Bumps near the puck are contact.', src: V('0:22') },
  { lesson: 1, q: 'Can there be body CONTACT in a non-checking league?', choices: ['No, never', 'Only in the playoffs', 'Yes. Contact happens all over the rink, even in non-checking leagues', 'Only for defensemen'], answer: 2, why: 'Non-check doesn’t mean no contact. Incidental contact happens everywhere on the ice.', src: V('0:22') + '; ' + M('29') },
  { lesson: 1, q: 'What is the main goal of a body check?', choices: ['Get possession of the puck', 'Punish the other player', 'Show you’re the toughest', 'Make the crowd cheer'], answer: 0, why: 'USA Hockey says a body check is to gain possession of the puck, NOT to punish or intimidate.', src: M('29') },
  { lesson: 1, q: 'Around what level is body checking introduced?', choices: ['Mites', 'Squirts', 'Around PeeWee / Bantam', 'Only in college'], answer: 2, why: 'The video says checking is introduced around PeeWee / Bantam.', src: V('0:22') },
  { lesson: 1, q: 'Why keep your head up and look around 360°?', choices: ['To find your parents in the stands', 'To know where players and hits are coming from', 'It looks cool', 'So the ref sees you'], answer: 1, why: 'Awareness lets you see hits coming and get ready for them.', src: V('0:48') },
  { lesson: 1, q: 'Two players chasing a loose puck lean into each other while both try to play it. That is…', choices: ['A penalty every time', 'Body contact, which is allowed when the puck is the goal', 'Checking from behind', 'Roughing'], answer: 1, why: 'The manual says players chasing the puck can reasonably lean into each other as long as the puck is the only goal.', src: M('29') },
  { lesson: 1, q: 'You’re about to pick up a loose puck along the wall. What should you do first?', choices: ['Look straight down at the puck', 'Shoulder check: look over your shoulder to see where the checkers are', 'Stop and wait', 'Close your eyes and go'], answer: 1, why: 'The manual says to shoulder check before getting a pass or a loose puck so you know where the pressure is.', src: M('62') },
  // Lesson 2
  { lesson: 2, q: 'In hockey third position, where should your weight be?', choices: ['On your heels', 'On the balls of your feet', 'Way up on your toes', 'On one skate'], answer: 1, why: 'On the balls of your feet you’re balanced. On your heels you go down, and too far on your toes it’s hard to stay up.', src: V('1:08') },
  { lesson: 2, q: 'Where does your checking power come from?', choices: ['Your arms', 'Your stick', 'Your legs', 'Your helmet'], answer: 2, why: 'Power comes from your legs. That’s why the stance has bent knees.', src: V('1:08') },
  { lesson: 2, q: 'What happens if you’re back on your heels when contact comes?', choices: ['You go down', 'You get stronger', 'Nothing', 'You skate faster'], answer: 0, why: 'On your heels you lose your balance and go down.', src: V('1:08') },
  { lesson: 2, q: 'Which is part of the athletic stance?', choices: ['Standing straight up', 'Head down, looking at the puck', 'Head up, knees bent, shoulders over knees', 'Knees locked'], answer: 2, why: 'Head up, knees bent, shoulders over knees, on the balls of your feet.', src: V('1:08') },
  { lesson: 2, q: 'In the tripod stance, what is the “third leg”?', choices: ['Your elbow', 'Your stick, on the ice with two hands', 'A teammate', 'The boards'], answer: 1, why: 'Feet a little wider than your shoulders, plus your stick on the ice with two hands, make a wide triangle base.', src: M('64') },
  { lesson: 2, q: 'Why does a deep knee bend help?', choices: ['It lowers your center of gravity so you’re stable and explosive', 'It makes you taller', 'It slows you down', 'It doesn’t matter'], answer: 0, why: 'A low center of gravity and wide base are what keep you stable and let you move fast.', src: M('64') },
  // Lesson 3
  { lesson: 3, q: 'What are the three checking tools from the video?', choices: ['Stick, elbow, knee', 'Shoulder, hips, two hands together', 'Head, shoulder, stick', 'Feet, knees, elbows'], answer: 1, why: 'Shoulder (either side), hips, and hands, but only both hands together.', src: V('1:40') },
  { lesson: 3, q: 'You shove a player with ONE hand, swinging your arm. What is that?', choices: ['A legal check', 'Roughing', 'Angling', 'A hip check'], answer: 1, why: 'One hand or a swinging arm is roughing. Hands only count when both are together.', src: V('1:40') },
  { lesson: 3, q: 'A carrier comes up the wing in front of you. What do you aim your shoulder at?', choices: ['His head', 'His hands and stick, to separate him from the puck', 'His knees', 'His back'], answer: 1, why: 'Hit in front and target the hands and stick, so you take him out of the play and get the puck moving.', src: V('4:14') },
  { lesson: 3, q: 'Which body parts does USA Hockey say a legal body check uses?', choices: ['Hips and shoulders (the trunk)', 'Elbows and forearms', 'Stick and hands', 'Knees and legs'], answer: 0, why: 'Legal checks use the trunk of the body (hips and shoulders), above the knees and at or below the shoulders.', src: M('29') },
  { lesson: 3, q: 'Is using your elbow to check allowed?', choices: ['Yes, if it’s fast', 'Only on defense', 'No. Elbows are not allowed', 'Only along the boards'], answer: 2, why: 'The manual says using the elbows is not allowed. Shoulders and hips are the right contact areas.', src: M('65') },
  { lesson: 3, q: 'You’re side by side with a carrier along the boards. Best move?', choices: ['Bump him with your shoulder, slow him down, and go get the puck', 'Trip him', 'Hit him from behind', 'Hook him with your stick'], answer: 0, why: 'Bump off along the boards: hit his shoulder, slow him down, and keep going to the puck.', src: V('4:14') },
  { lesson: 3, q: 'You come in too early and he sees you. What usually happens?', choices: ['You get the puck easily', 'You get caught and you go down', 'He falls down', 'Nothing'], answer: 1, why: 'Timing is huge. Coming in too early and getting caught means you go down.', src: V('2:02') },
  { lesson: 3, q: 'When both players meet in the bump drill, what’s the technique?', choices: ['Hit at the same time, push with your legs, shoulder to shoulder', 'Lead with your head', 'Stick up high', 'Stand still and wait'], answer: 0, why: 'Hit at the same time, push with your legs, shoulder to shoulder.', src: V('2:02') },
  { lesson: 3, q: 'Where should the checker’s stick blade be during a proper body check?', choices: ['Up at shoulder height', 'Below the knees, stick on puck', 'Behind his back', 'It doesn’t matter'], answer: 1, why: 'Good checking starts with stick on puck, so the stick blade stays below the knees.', src: M('29') },
  // Lesson 4
  { lesson: 4, q: 'You’re behind a player and can see the NUMBERS on his jersey. What do you do?', choices: ['Hit him hard', 'Don’t hit. You can pin him instead', 'Push with two hands', 'Trip him'], answer: 1, why: 'The numbers rule: if you can see the numbers, don’t hit. Never hit from behind. Pinning is OK.', src: V('5:14') },
  { lesson: 4, q: 'How should your head be when you check?', choices: ['Lead with your head', 'Lead with your shoulder, head away', 'Head down', 'Head into his chest'], answer: 1, why: 'Never lead with your head. Lead with your shoulder and keep your head away.', src: V('2:35') },
  { lesson: 4, q: 'During your follow-through, what do you watch for?', choices: ['Your elbow coming up and hitting his head', 'Your skate laces', 'The scoreboard', 'Nothing'], answer: 0, why: 'An elbow coming up on the follow-through can hit the head, which is a head check.', src: V('2:35') },
  { lesson: 4, q: 'What should your stick do during a check?', choices: ['Come up high', 'Stay low and out of the way', 'Hook his arm', 'Go across his chest'], answer: 1, why: 'Keep the stick low and out of the way, or it’s high-sticking.', src: V('3:13') },
  { lesson: 4, q: 'In open ice, the carrier cuts back. What do you NOT do?', choices: ['Turn and skate', 'Stick out a knee, leg, or arm', 'Keep your stick on the ice', 'Angle again'], answer: 1, why: 'Never stick out a knee, leg, or arm. It causes knee-on-knee injuries and penalties.', src: V('7:01') },
  { lesson: 4, q: 'Why not skate straight at the puck carrier?', choices: ['It gives him options to go either way', 'It’s too slow', 'It’s illegal', 'It tires you out'], answer: 0, why: 'Coming straight in gives him options. Angle in to force him one way.', src: V('5:53') },
  { lesson: 4, q: 'What is ANGLING?', choices: ['Coming in at an angle to force the carrier one way, then making the play', 'Tilting your stick', 'Hitting from behind at an angle', 'Skating backward'], answer: 0, why: 'Angling steers the carrier to an area where his space closes up, then you make the hit or the play.', src: V('5:53') + '; ' + M('29') },
  { lesson: 4, q: 'Open-ice hit coming up. What speed?', choices: ['100 mph, as fast as possible', 'Controlled. Angle and time it', 'Stop completely', 'Glide in backward'], answer: 1, why: 'Don’t go 100 mph. Angle and time it right.', src: V('7:01') },
  { lesson: 4, q: 'What can happen if you hit an opponent in the head?', choices: ['Nothing', 'A head-contact penalty and possibly a suspension', 'You get a goal', 'A faceoff'], answer: 1, why: 'Hitting the head is a head check and can mean a suspension.', src: V('2:35') },
  { lesson: 4, q: 'Pinning a player on the boards side by side, what do you do?', choices: ['Shoulder in, turn your body to the boards, drive your knee between his feet so a teammate can help', 'Hit him from behind', 'Hold him with your stick', 'Punch'], answer: 0, why: 'Side by side: use your shoulder, turn into the boards, and put your knee between his feet so he can’t get out until a teammate comes.', src: V('5:14') },
  { lesson: 4, q: 'A player passed the puck a second ago and is looking away. Should you still “finish the check”?', choices: ['Yes, always finish', 'No. Avoid or ease off the contact, because he no longer has the puck and is defenseless', 'Yes, but only hard', 'Only if the coach says'], answer: 1, why: 'The manual says “finishing the check” is unacceptable. Late checks on a defenseless player are penalized.', src: M('29') },
  { lesson: 4, q: 'Two players are already battling for the puck on the boards. Should you come in and body check one of them?', choices: ['Yes, it’s a free hit', 'No. Players tied up along the boards are considered defenseless', 'Only from behind', 'Only with your stick'], answer: 1, why: 'USA Hockey says checking a player who’s already tied up with another player is dangerous and must be penalized.', src: M('29') },
  // Lesson 5
  { lesson: 5, q: 'How far off the boards is the danger zone?', choices: ['About 3 feet (half a stick to a stick length)', 'About 30 feet', 'The whole neutral zone', 'Only the corners'], answer: 0, why: 'About 3 feet off the boards, all around the rink.', src: V('9:52') },
  { lesson: 5, q: 'You have the puck in the danger zone and a checker is coming. What are your two choices?', choices: ['Stop or turn around', 'Get OUT to the middle or get TIGHT to the boards', 'Glide or fall', 'Drop your stick or duck'], answer: 1, why: 'Get out or get tight. Don’t stay in that 3-foot gap where you can get slammed.', src: V('9:52') },
  { lesson: 5, q: 'Carrying the puck along the wall, what should your feet do?', choices: ['Keep moving', 'Glide to save energy', 'Stop', 'Cross over backward'], answer: 0, why: 'Keep your feet moving. A glider is a “sitting duck.”', src: V('10:27') },
  { lesson: 5, q: 'Can a puck carrier push back when someone tries to hit him?', choices: ['No, never', 'Yes. You can counter-hit or bump back, even with the puck', 'Only without the puck', 'Only on the power play'], answer: 1, why: 'You can always counter or bump back, even with the puck.', src: V('10:27') + '; ' + V('11:35') },
  { lesson: 5, q: 'When do players usually get hurt receiving contact?', choices: ['When they keep their feet moving', 'When they freeze or open up (turn their shoulder or back)', 'When they stay tight to the boards', 'When their head is up'], answer: 1, why: 'Freezing or opening up is when players get hurt. Stay aware and keep your feet moving.', src: V('11:35') },
  { lesson: 5, q: 'Taking a check along the boards, what does the manual say to do with your arm?', choices: ['Brace it against the glass', 'Hold it over your head', 'Swing it at the checker', 'Hide it behind your back'], answer: 0, why: 'Hip and skate against the boards, brace with your arm on the glass, lean into the checker.', src: M('66') },
  { lesson: 5, q: 'You’re tight to the boards with your feet moving. What’s likely?', choices: ['You’ll be fine and might keep the puck', 'You’ll get slammed', 'Automatic penalty', 'You lose the puck for sure'], answer: 0, why: 'Feet moving plus tight to the boards means you’ll be fine and may keep possession.', src: V('10:27') },
  { lesson: 5, q: 'If you get pressured from behind at the boards, what does the manual teach?', choices: ['Hands up with knuckles on the glass, don’t look down: “Heads Up, Don’t Duck!”', 'Turn your back more', 'Duck your head', 'Let go of everything'], answer: 0, why: 'Brace with your hands on the glass, keep your hips away from the boards, and keep your head up. Don’t duck.', src: 'USA Hockey manual, “Safely Taking the Impact from Behind”' },
  { lesson: 5, q: 'Bumping on open ice, which parts should take the impact?', choices: ['Shoulder and hip, elbow tucked in', 'Head and chest', 'Knees', 'Hands and wrists'], answer: 0, why: 'Absorb with shoulder and hip, and tuck your elbow in to protect your ribs.', src: M('65') + '; ' + M('67') },
  // Lesson 6
  { lesson: 6, q: 'How do you get better at checking?', choices: ['Watch only', 'Practice. Even at home with a parent or sibling', 'Wait until you’re bigger', 'Only in games'], answer: 1, why: 'Checking is a hockey skill. The only way to improve is practice, giving and taking contact.', src: V('12:25') },
  { lesson: 6, q: 'What’s the goal of the “bump” drill?', choices: ['Big hits', 'Getting comfortable with contact', 'Speed only', 'Shooting'], answer: 1, why: 'The bump drill is about getting comfortable with contact, not big hits.', src: V('3:28') },
  { lesson: 6, q: 'Defending 1-on-1 skating backward, how do you line up?', choices: ['Your inside shoulder to his shoulder, stick in the middle, ride him to the wall', 'Straight at his chest at full speed', 'Behind him', 'Way off in the middle'], answer: 0, why: 'Line up shoulder to shoulder, stay just off him, stick in the middle so he can’t cut inside, ride him to the wall.', src: V('8:11') },
  { lesson: 6, q: 'As a D-man, you chase a big hit too early. What happens?', choices: ['He goes around you', 'You always win', 'The ref stops play', 'He gives up the puck'], answer: 0, why: 'Don’t chase the hit or be too aggressive, or he’ll go around you. Be patient and let it come.', src: V('8:11') },
  { lesson: 6, q: 'In a 1-on-1, what is the real goal?', choices: ['Knock him down', 'Separation: get him away from the puck', 'Make him angry', 'Draw a penalty'], answer: 1, why: 'The goal is separation, not knocking him down.', src: V('8:11') },
]
export const QUESTIONS: Question[] = raw.map((q, i) => ({ ...q, id: `q${i + 1}` }))
