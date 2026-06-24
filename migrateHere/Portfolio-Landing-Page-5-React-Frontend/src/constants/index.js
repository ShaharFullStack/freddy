/**
 * Central data for Freddy Barak / חיים שכאלה landing page.
 * Images are imported from the parent FreddyLanding/assets/images/ folder.
 * Edit these arrays to update copy, images and contact info.
 */

// Image imports – paths from src/constants/ up to FreddyLanding/assets/images/
import freddyImg from '../assets/images/freddy.png'
import freddy2Img from '../assets/images/freddy2.png'
import freddy3Img from '../assets/images/freddy3.jpg'
import freddy5Img from '../assets/images/freddyfull.png'
import freddy7Img from '../assets/images/freddy7.jpg'
import freddy9Img from '../assets/images/freddy9.png'
import image2Img from '../assets/images/image2.png'
import logoImg from '../assets/images/logo.png'

export { freddy2Img, freddy5Img, freddyImg, logoImg }

/** Event types for the Services (stacked cards) section */
export const eventsData = [
  {
    title: "אירוע פרישה",
    description:
      "רגע השיא של הקריירה. מעלים תחנות חשובות מתקופת העבודה דרך סיפורים שמשקפים את התרומה לארגון, ומשדרים לכל הצוות שנשאר עד כמה החברה מעריכה את מי שנתן לה שנים.",
    items: [
      { title: "תחקיר מעמיק על שנות הקריירה" },
      { title: "ראיונות קולגות, חברים ומשפחה" },
      { title: "סרט מרגש ומצגת חיים" },
    ],
  },
  {
    title: "קידום בתפקיד",
    description:
      "מציינים אבן דרך מקצועית, מספרים את הדרך שעשה האדם ומציבים אותו בפני הצוות בכבוד הראוי. ערב שמחזק את הביטחון ומניע את כל הארגון קדימה.",
    items: [
      { title: "בניית תוכן מותאם אישית לאדם ולארגון" },
      { title: "הנחיה מקצועית לאורך כל הערב" },
      { title: "שירה בציבור עם גיטרה" },
    ],
  },
  {
    title: "טקס הוקרה",
    description:
      "אומרים תודה על הכל. ערב שמכבד עובד או מנהל מרכזי ומחזק את תחושת השייכות של כל הצוות. כי כולם צריכים לדעת שמי שנמצא ביניהם שווה עצירה.",
    items: [
      { title: "סיפורים אישיים מהלב" },
      { title: "וידאו מרגש ומצגת ייחודית" },
      { title: "הנחיה חמה ומכובדת" },
    ],
  },
  {
    title: "מה כלול",
    description:
      "חבילה אחת מקצה לקצה, בלי עומס על הצוות שלכם. פרדי מטפל בכל שלב בהפקה בצורה עצמאית ומקצועית.",
    items: [
      { title: "כתיבת תסריט ועריכת וידאו מקצועית" },
      { title: "צילום בשתי מצלמות וסרט מזכרת" },
      { title: "הנחיה ושירה בציבור עם גיטרה" },
    ],
  },
]

/** Gallery items for the Works section – Freddy's event moments */
export const galleryItems = [
  {
    id: 1,
    name: "הסיפורים שמרכיבים חיים שלמים",
    image: image2Img,
    bgImage: image2Img,
    frameworks: [
      { id: 1, name: "ראיון אישי" },
      { id: 2, name: "פרישה" },
    ],
  },
  {
    id: 2,
    name: "הנחיה אישית ומדויקת",
    image: freddy3Img,
    bgImage: freddy3Img,
    frameworks: [
      { id: 1, name: "הנחיה" },
      { id: 2, name: "קידום" },
    ],
  },
  {
    id: 3,
    name: "במה שמוכנה לרגע הגדול",
    image: freddy9Img,
    bgImage: freddy9Img,
    frameworks: [
      { id: 1, name: "הפקה" },
      { id: 2, name: "אירוע" },
    ],
  },
  {
    id: 4,
    name: "מוזיקה שמחברת את הקהל",
    image: freddy7Img,
    bgImage: freddy7Img,
    frameworks: [
      { id: 1, name: "שירה בציבור" },
      { id: 2, name: "הוקרה" },
    ],
  },
]

/** Contact + social info used in Navbar and Contact section */
export const contactInfo = {
  phone: "052-8818148",
  phoneHref: "tel:+972528818148",
  whatsappHref:
    "https://wa.me/972528818148?text=%D7%94%D7%99%D7%99%2C%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%A4%D7%A8%D7%98%D7%99%D7%9D%20%D7%A2%D7%9C%20%D7%90%D7%99%D7%A8%D7%95%D7%A2%20%D7%97%D7%99%D7%99%D7%9D%20%D7%A9%D7%9B%D7%90%D7%9C%D7%94",
  whatsappFormHref:
    "https://wa.me/972528818148?text=%D7%94%D7%99%D7%99%2C%20%D7%94%D7%92%D7%A2%D7%AA%D7%99%20%D7%93%D7%A8%D7%9A%20%D7%94%D7%90%D7%AA%D7%A8%20%D7%95%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%A4%D7%A8%D7%98%D7%99%D7%9D",
  website: "freddybarak.com",
  websiteHref: "https://freddybarak.com",
}

/** Testimonials used in About / Works section */
export const testimonials = [
  {
    stars: "★★★★★",
    text: "פרדי עשה לנו ערב שלא נשכח. הוא הגיע מוכן לחלוטין, הכיר את אבא שלנו כאילו גדל איתו. כל אחד מהאורחים יצא עם דמעות וחיוך יחד.",
    name: "מיכל ר׳",
    role: "בת לפורש ממשרד הביטחון",
    avatar: "מ",
  },
  {
    stars: "★★★★★",
    text: "הזמנו את פרדי לאירוע קידום של מנהלת בכירה. הוא בנה ערב שלם מאפס, ראיין עשרות אנשים, וסיפר את הסיפור שלה בצורה שהרימה את כל הארגון.",
    name: "אייל ש׳",
    role: 'מנכ"ל חברת תקשורת',
    avatar: "א",
  },
  {
    stars: "★★★★★",
    text: "ארגנו אירוע פרישה גדול עם 200 איש. פרדי ניהל הכל בעצמו, מהתחקיר, דרך הסרט ועד ההנחיה. לא היה לנו דאגה אחת. מומלץ מכל הלב.",
    name: "רותם כ׳",
    role: "מנהלת משאבי אנוש, רשות מקומית",
    avatar: "ר",
  },
]
