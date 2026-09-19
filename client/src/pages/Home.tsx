import { useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Clock3,
  Facebook,
  Instagram,
  MapPin,
  Menu as MenuIcon,
  Phone,
  Utensils,
  X,
} from "lucide-react";

const PHONE_DISPLAY = "01208380837";
const PHONE_TEL = "+201208380837";
const PHONE_2_DISPLAY = "01035605350";
const PHONE_2_TEL = "+201035605350";
const MAP_URL =
  "https://www.bing.com/maps/search?v=2&pc=FACEBK&mid=8100&mkt=en-US&fbclid=IwY2xjawUZ_HZwZG9mBWV4dG4DYWVtAjEwAGJyaWQRMUI3NXBlNUo4YllBcjladFhzcnRjBmFwcF9pZBAyMjIwMzkxNzg4MjAwODkyAAEeU1LVO9M3TBQaLJTDybzaQ7FIdJpMLfQGZ5RqNM0Lah1qkFqPOfg2URzoX20_aem_jw6P504q-6c5OIXv_YLHnQ&FORM=FBKPL1&q=%D8%A7%D9%84%D9%82%D9%88%D8%B5%D9%8A%D9%87++%D8%B4%D8%A7%D8%B1%D8%B9+%D8%A7%D9%84%D9%85%D8%AD%D9%84%D8%A7%D8%AA+%D8%A7%D9%85%D8%A7%D9%85+%D8%AD%D9%88%D8%B1+%D8%B9%D9%8A%D9%86+&cp=27.445448%7E30.969412&lvl=11&style=r";


const menuCategories = [
  { name: 'قسم الكريب', items: [
    ['كريب شاورما فراخ', '100'], ['كريب شاورما تندوري', '100'], ['كريب كرسبي', '85'], ['كريب زنجر', '85'], ['كريب بانيه', '80'], ['كريب شيش', '90'], ['كريب مكس فراخ', '110'], ['كريب بطاطس', '60'], ['كريب عز الدمشقي', '120'],
  ]},
  { name: 'قسم الوجبات', items: [
    ['وجبة شاورما عربي فراخ سنجل', '100', '6 قطع شاورما + بطاطس + ثومية + مخلل + عيش محمص'], ['وجبة شاورما عربي فراخ دبل', '180', '12 قطعة شاورما + بطاطس + ثومية + عيش محمص'], ['وجبة شاورما عربي تندوري سنجل', '110', '5 قطع شاورما عربي + بطاطس + ثومية + مخلل + عيش محمص'], ['وجبة شاورما عربي تندوري دبل', '200', '12 قطعة شاورما تندوري + بطاطس ثومية + مخلل + عيش محمص'], ['وجبة ماريا فراخ', '130', 'شاورما فراخ + موتزاريلا + صوص عز + مخلل + ثومية'], ['وجبة ماريا تندوري', '140', 'شاورما تندوري + صوص تندوري + ثومية + مخلل + موتزاريباد'], ['وجبة ماريا مكس', '150', 'شاورما تندوري + شاورما فراخ + موتزاريبلا + صوص تندوري + صوص عز + مخلل + ثومية'], ['وجبة زنجر', '110', '3 قطع زنجر + أرز بسمتي + ثومية + مخلل'], ['وجبة كرسبي', '110', '3 قطع كرسبي + 3 قطع كرسي + مخلل'], ['وجبة عز الدمشقي', '180', 'ربع فراخ فرك + 3 قطع عربي + قطعة كرسي + اروستمي + بطاطس + ثومية + مخلل'], ['وجبة الدمشقي', '130', '6 قطع عربي + أرز بسمتي + بطاطس + ثومية + مخلل'], ['وجبة سكالوب', '120', 'قطعة سكالوب + أرز بسمتي + ثومية + مخلل + بطاطس'],
  ]},
  { name: 'أطباق الريزو', items: [['ريزو رانش', '80'], ['ريزو باربيكيو', '80'], ['ريزو سويت شيلي', '80'], ['ريزو شيـ.......ـدر', '80']]},
  { name: 'سندوتشات الشاورما', items: [['شاورما فراخ', '70 / 55'], ['شاورما تندوري', '75 / 65'], ['شاورما مكس', '75 / 65'], ['شاورما فراخ اكسترا', '75 / 65'], ['شاورما تندوري اكسترا', '85 / 75'], ['شاورما فراخ نص متر', '170'], ['شاورما تندوري نص متر', '180'], ['زنجر سوري', '80'], ['كرسي سوري', '75'], ['سندوتش عز الدمشقي', '110'], ['بطاطس موتزاريلا', '45'], ['بطاطس عز', '35']]},
  { name: 'قسم الفتة', items: [['فتة شاورما فراخ', '100 / 75'], ['فتة شاورما تندوري', '110 / 80'], ['فتة زنجر', '80 / 60'], ['فتة كرسي', '80 / 60'], ['فتة مكسي', '115 / 90']]},
  { name: 'الوجبات المشوية', items: [['فرخه شواية', '320', 'أرز بسمتي + ثومية + بطاطس + عيش + مخلل'], ['نص فرخه شواية', '180', 'أرز بسمتي + ثومية + بطاطس + عيش + مخلل'], ['ربع صدر شواية', '120', 'أرز بسمتي + ثومية + بطاطس + عيش + مخلل'], ['ربع ورك شواية', '100', 'أرز بسمتي + ثومية + بطاطس + عيش + مخلل'], ['دبل ورك', '160', 'أرز بسمتي + ثومية + بطاطس + عيش + مخلل']]},
  { name: 'الفراخ البروستد', items: [['وجبة قطعتين بروستد', '90', 'ثومية + بطاطس + خبز + كيتشب'], ['وجبة 3 قطع بروستد', '135', 'كلسلو + بطاطس + خبز + كيتشب'], ['وجبة 4 قطع بروستد', '180', 'كلسلو + بطاطس + خبز + كيتشب'], ['وجبة 5 قطع بروستد', '240', 'كلسلو + بطاطس + خبز + كيتشب'], ['وجبة 9 قطع بروستد', '430', 'كلسلو + بطاطس + خبز + كيتشب']]},
  { name: 'الشاورما بالكيلو', items: [['شاورما شاورما فراخ', '180'], ['نص كيلو شاورما فراخ', '340'], ['كيلو شاورما فراخ', '640'], ['ربع كيلو شاورما تندوري', '180'], ['نص كيلو شاورما تندوري', '360'], ['كيلو شاورما تندوري', '670']]},
  { name: 'الإضافات', items: [['ثومية عادي', '15 / 25'], ['ثومية أسيابسي', '15 / 25'], ['صوص التندوري', '20 / 30'], ['كول سلو', '20 / 30'], ['بطاطس', '25 / 35'], ['صوص رانش', '15'], ['صوص باربيكيو', '15'], ['صوص كاتشب', '10'], ['صوص سويت شيلي', '15'], ['صوص شيــــدر', '15'], ['اكسترا موتزاريلا', '10'], ['أرز بسمتي', '25'], ['خبز محمص', '10'], ['عيش سوري', '4'], ['مخلل', '10']]},
];

function MenuBoard() {
  const [active, setActive] = useState(0);
  const tabsRef = useRef<HTMLDivElement>(null);
  const category = menuCategories[active];
  const scrollTabs = (distance: number) => {
    tabsRef.current?.scrollBy({ left: distance, behavior: "smooth" });
  };
  return (
    <div className="mt-12">
      <div className="flex items-center gap-2">
        <button type="button" onClick={() => scrollTabs(-260)} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#d8c2a3] bg-[#fffaf3] text-[#7a2028] shadow-sm transition hover:border-[#c79a4e] hover:bg-[#f2e5d4] sm:h-10 sm:w-10" aria-label="تحريك أقسام المنيو إلى اليمين"><ArrowRight size={17} /></button>
        <div ref={tabsRef} className="scrollbar-none -mx-4 flex min-w-0 flex-1 gap-2 overflow-x-auto px-4 pb-4 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0">
          {menuCategories.map((section, index) => (
            <button key={section.name} onClick={() => setActive(index)} className={`shrink-0 rounded-full border px-4 py-2.5 text-sm font-bold transition ${active === index ? 'border-[#7a2028] bg-[#7a2028] text-white shadow-md' : 'border-[#d8c2a3] bg-[#fffaf3] text-[#70544a] hover:border-[#c79a4e] hover:text-[#7a2028]'}`}>{section.name}</button>
          ))}
        </div>
        <button type="button" onClick={() => scrollTabs(260)} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#d8c2a3] bg-[#fffaf3] text-[#7a2028] shadow-sm transition hover:border-[#c79a4e] hover:bg-[#f2e5d4] sm:h-10 sm:w-10" aria-label="تحريك أقسام المنيو إلى اليسار"><ArrowLeft size={17} /></button>
      </div>
      <div className="mt-7 flex items-center justify-between border-b border-[#d8c2a3] pb-4">
        <div><p className="text-xs text-[#9a6b2f]">القسم المختار</p><h3 className="mt-1 font-display text-2xl font-bold text-[#2a1112]">{category.name}</h3></div>
        <span className="rounded-full bg-[#efe1d0] px-3 py-1 text-xs text-[#8b6c4f]">{category.items.length} أصناف</span>
      </div>
      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {category.items.map(([name, price, description]) => (
          <article key={`${name}-${price}`} className="group rounded-2xl border border-[#e1d2c0] bg-[#fffaf3] p-5 transition hover:-translate-y-0.5 hover:border-[#c79a4e] hover:shadow-[0_12px_30px_rgba(82,46,24,0.08)]">
            <div className="flex items-start justify-between gap-4"><h4 className="text-base font-bold text-[#2a1112]">{name}</h4><div className="shrink-0 text-left"><span dir="ltr" className="font-display text-lg font-bold text-[#8f6328]">{price}</span><span className="mr-1 text-[10px] text-[#9e8971]">جنيه</span></div></div>
            {description && <p className="mt-2 text-xs leading-6 text-[#866e62]">{description}</p>}
          </article>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div dir="rtl" className="min-h-screen overflow-x-hidden bg-[#f7f1e8] text-[#281b19]">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#2a1112]/85 text-white backdrop-blur-xl">
        <div className="container flex h-[76px] items-center justify-between">
          <button onClick={() => scrollTo("home")} className="flex items-center gap-3 text-right" aria-label="العودة للرئيسية">
            <img src="/images/logo.png" alt="شعار عز الدمشقي" className="h-12 w-12 rounded-full border border-[#d5ad63]/50 object-cover" />
            <span>
              <span className="block font-display text-xl font-bold leading-none text-[#f3d18b]">عز الدمشقي</span>
              <span className="mt-1 block text-[10px] tracking-[0.2em] text-[#e8d9c2]/70">مذاق الشام الأصيل</span>
            </span>
          </button>

          <nav className="hidden items-center gap-8 text-sm text-[#f5e8d7]/80 md:flex">
            <button onClick={() => scrollTo("home")} className="transition hover:text-[#f3d18b]">الرئيسية</button>
            <button onClick={() => scrollTo("menu")} className="transition hover:text-[#f3d18b]">المنيو</button>
            <button onClick={() => scrollTo("visit")} className="transition hover:text-[#f3d18b]">زورونا</button>
          </nav>

          <div className="hidden items-center gap-3 sm:flex">
            <a href={`tel:${PHONE_TEL}`} className="flex items-center gap-2 rounded-full border border-[#d5ad63]/50 px-4 py-2 text-sm text-[#f3d18b] transition hover:bg-[#d5ad63] hover:text-[#2a1112]">
              <Phone size={15} /> اتصل بالمطعم
            </a>
            <button onClick={() => scrollTo("menu")} className="rounded-full bg-[#c79a4e] px-5 py-2 text-sm font-bold text-[#2a1112] transition hover:bg-[#e2bd76]">اطلب الآن</button>
          </div>

          <button onClick={() => setMenuOpen((value) => !value)} className="rounded-full border border-white/20 p-2 md:hidden" aria-label="فتح القائمة">
            {menuOpen ? <X size={21} /> : <MenuIcon size={21} />}
          </button>
        </div>
        {menuOpen && (
          <div className="border-t border-white/10 bg-[#2a1112] px-5 pb-5 pt-3 md:hidden">
            <div className="flex flex-col gap-1 text-sm">
              <button onClick={() => scrollTo("home")} className="rounded-lg px-3 py-3 text-right text-[#f5e8d7] hover:bg-white/10">الرئيسية</button>
              <button onClick={() => scrollTo("menu")} className="rounded-lg px-3 py-3 text-right text-[#f5e8d7] hover:bg-white/10">المنيو</button>
              <button onClick={() => scrollTo("visit")} className="rounded-lg px-3 py-3 text-right text-[#f5e8d7] hover:bg-white/10">زورونا</button>
              <a href={`tel:${PHONE_TEL}`} className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-[#c79a4e] px-3 py-3 font-bold text-[#2a1112]"><Phone size={16} /> اتصل بالمطعم</a>
            </div>
          </div>
        )}
      </header>

      <main>
        <section id="home" className="relative flex min-h-[720px] items-end overflow-hidden bg-[#2a1112] pt-28">
          <img src="/images/hero.jpg" alt="مائدة من المطبخ السوري" className="absolute inset-0 h-full w-full object-cover object-center opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-l from-[#1c0a0a]/50 via-[#1c0a0a]/65 to-[#1c0a0a]/95" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(213,173,99,0.22),transparent_28%)]" />
          <div className="container relative z-10 pb-20 md:pb-28">
            <div className="max-w-2xl animate-fade-up">
              <div className="mb-6 flex items-center gap-3 text-[#e5c27b]">
                <span className="h-px w-12 bg-[#e5c27b]" />
                <span className="text-xs font-bold tracking-[0.25em]">من قلب دمشق إلى مائدتكم</span>
              </div>
              <h1 className="font-display text-5xl font-bold leading-[1.08] text-[#fffaf0] sm:text-7xl">عز الدمشقي<br /><span className="text-[#e5c27b]">طعمٌ يروي حكاية</span></h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-[#f7e9d7]/85 sm:text-lg">أصالة المطبخ السوري في كل لقمة، محضّرة بحب وبمكونات مختارة لتعيشوا تجربة شامية لا تُنسى.</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href={`tel:${PHONE_TEL}`} className="flex items-center justify-center gap-3 rounded-full bg-[#c79a4e] px-7 py-4 font-bold text-[#2a1112] shadow-[0_14px_30px_rgba(0,0,0,0.25)] transition hover:-translate-y-1 hover:bg-[#e2bd76]"><Phone size={19} /> اتصل الآن <span dir="ltr" className="text-sm font-normal opacity-70">{PHONE_DISPLAY}</span></a>
                <button onClick={() => scrollTo("menu")} className="flex items-center justify-center gap-2 rounded-full border border-white/30 px-7 py-4 font-bold text-white transition hover:border-[#e5c27b] hover:text-[#e5c27b]">اكتشف المنيو <ArrowLeft size={18} /></button>
              </div>
            </div>
          </div>
          <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-xs text-white/50 md:flex"><span className="h-px w-10 bg-white/30" /> اسحب لاكتشاف المزيد <span className="h-px w-10 bg-white/30" /></div>
        </section>

        <section id="menu" className="relative bg-[#f7f1e8] py-24 sm:py-32">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-bold tracking-[0.3em] text-[#9a6b2f]">قائمة الطعام</p>
              <h2 className="mt-4 font-display text-4xl font-bold text-[#2a1112] sm:text-5xl">منيو عز الدمشقي</h2>
              <div className="mx-auto mt-5 h-px w-16 bg-[#c79a4e]" />
              <p className="mt-5 leading-8 text-[#755f59]">اختاروا من أطيب وصفات الشام، محضّرة بعناية وتقدّم لكم يوميًا.</p>
            </div>
            <MenuBoard />
          </div>
        </section>

        <section id="visit" className="relative overflow-hidden bg-[#2a1112] py-24 text-white sm:py-28">
          <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-[#c79a4e]/10 blur-3xl" />
          <div className="container relative">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-center">
              <div>
                <p className="text-xs font-bold tracking-[0.3em] text-[#e5c27b]">زورونا اليوم</p>
                <h2 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl">أهلًا بكم في<br /><span className="text-[#e5c27b]">عز الدمشقي</span></h2>
                <p className="mt-6 max-w-md leading-8 text-[#eadbc7]/75">نستقبلكم على مدار الساعة لنقدّم لكم نكهة الشام الأصيلة في أجواء دافئة وخدمة تليق بكم.</p>
                <div className="mt-9 flex flex-wrap gap-3">
                  <a href={MAP_URL} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full bg-[#f7f1e8] px-5 py-3 text-sm font-bold text-[#2a1112] transition hover:bg-[#e5c27b]"><MapPin size={17} /> موقعنا على الخريطة</a>
                  <a href={`tel:${PHONE_TEL}`} className="flex items-center gap-2 rounded-full border border-[#e5c27b]/60 px-5 py-3 text-sm font-bold text-[#e5c27b] transition hover:bg-[#e5c27b] hover:text-[#2a1112]"><Phone size={17} /> اتصل بنا</a>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-sm"><div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-[#c79a4e]/15 text-[#e5c27b]"><MapPin size={21} /></div><p className="text-xs text-[#d9c5ac]/60">العنوان</p><p className="mt-2 text-lg leading-8">القوصية، شارع المحلات<br />أمام حور عين</p></div>
                <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-sm"><div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-[#c79a4e]/15 text-[#e5c27b]"><Clock3 size={21} /></div><p className="text-xs text-[#d9c5ac]/60">مواعيد العمل</p><p className="mt-2 text-lg leading-8">مفتوحون<br />24 ساعة يوميًا</p></div>
                <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-sm sm:col-span-2"><div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-[#c79a4e]/15 text-[#e5c27b]"><Phone size={21} /></div><p className="text-xs text-[#d9c5ac]/60">أرقام الطلب والاستفسار</p><div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6"><a href={`tel:${PHONE_TEL}`} dir="ltr" className="text-2xl font-bold tracking-wider text-[#e5c27b] transition hover:text-white">{PHONE_DISPLAY}</a><a href={`tel:${PHONE_2_TEL}`} dir="ltr" className="text-2xl font-bold tracking-wider text-[#e5c27b] transition hover:text-white">{PHONE_2_DISPLAY}</a></div></div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#190b0c] py-9 text-[#d9c5ac]">
        <div className="container flex flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-right">
          <div className="flex items-center gap-3"><img src="/images/logo.png" alt="عز الدمشقي" className="h-11 w-11 rounded-full object-cover" /><div><p className="font-display text-lg font-bold text-[#e5c27b]">عز الدمشقي</p><p className="text-xs text-white/45">مذاق الشام الأصيل</p></div></div>
          <div className="flex items-center gap-4"><a href="https://www.facebook.com/profile.php?id=61584194342242&locale=ar_AR" target="_blank" rel="noreferrer" aria-label="فيسبوك" className="transition hover:text-[#e5c27b]"><Facebook size={19} /></a><span title="تيك توك قريبًا" className="text-xs text-white/35">تيك توك قريبًا</span><span className="text-xs text-white/35">© 2026 جميع الحقوق محفوظة</span></div>
        </div>
      </footer>

      <a href={`tel:${PHONE_TEL}`} className="fixed bottom-5 left-5 z-40 flex items-center gap-2 rounded-full bg-[#c79a4e] px-5 py-3.5 text-sm font-bold text-[#2a1112] shadow-[0_12px_30px_rgba(0,0,0,0.3)] transition hover:-translate-y-1 hover:bg-[#e5c27b] sm:hidden"><Phone size={18} /> اتصل الآن</a>
    </div>
  );
}
  
