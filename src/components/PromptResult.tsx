import { useState } from "react";
import { Copy, Check, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface PromptSection {
  ar: string;
  en: string;
}

export interface StructuredPrompt {
  titleAr: string;
  titleEn: string;
  overviewAr: string;
  overviewEn: string;
  sections: Record<string, PromptSection>;
}

const sectionEmojis: Record<string, string> = {
  "Camera Angle": "📷",
  "Camera Effects": "🎬",
  "Environment": "🌍",
  "Colors": "🎨",
  "Materials & Textures": "🧱",
  "Lighting": "💡",
  "Time of Day": "⏰",
  "Art Style": "🖼️",
  "Mood & Emotion": "😊",
  "Composition": "📐",
};

const sectionLabelsAr: Record<string, string> = {
  "Camera Angle": "زاوية الكاميرا",
  "Camera Effects": "تأثيرات الكاميرا",
  "Environment": "البيئة المحيطة",
  "Colors": "الألوان",
  "Materials & Textures": "الخامات والمواد",
  "Lighting": "الإضاءة",
  "Time of Day": "التوقيت",
  "Art Style": "أسلوب الصورة",
  "Mood & Emotion": "التعبيرات والمشاعر",
  "Composition": "التكوين",
};

interface PromptResultProps {
  prompt: StructuredPrompt;
}

const PromptResult = ({ prompt }: PromptResultProps) => {
  const [copiedLang, setCopiedLang] = useState<string | null>(null);

  const buildFullText = (lang: "ar" | "en") => {
    const title = lang === "ar" ? prompt.titleAr : prompt.titleEn;
    const overview = lang === "ar" ? prompt.overviewAr : prompt.overviewEn;
    let text = `${title}\n${overview}\n\n`;
    for (const [key, section] of Object.entries(prompt.sections)) {
      const label = lang === "ar" ? (sectionLabelsAr[key] || key) : key;
      text += `${label}\n${section[lang]}\n\n`;
    }
    return text.trim();
  };

  const handleCopy = async (lang: "ar" | "en") => {
    await navigator.clipboard.writeText(buildFullText(lang));
    setCopiedLang(lang);
    toast.success(lang === "ar" ? "تم النسخ!" : "Copied!");
    setTimeout(() => setCopiedLang(null), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <Tabs defaultValue="ar" className="w-full" dir="rtl">
        <TabsList className="w-full bg-muted/30 rounded-xl">
          <TabsTrigger value="ar" className="flex-1 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            🇸🇦 عربي
          </TabsTrigger>
          <TabsTrigger value="en" className="flex-1 rounded-lg data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground">
            🇬🇧 English
          </TabsTrigger>
        </TabsList>

        {(["ar", "en"] as const).map((lang) => (
          <TabsContent key={lang} value={lang} className="mt-4">
            <div className="glass-card rounded-xl p-5 gradient-border space-y-4">
              {/* Header with copy */}
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-foreground text-lg">
                  {lang === "ar" ? prompt.titleAr : prompt.titleEn}
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleCopy(lang)}
                  className="h-8 w-8"
                >
                  {copiedLang === lang ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>

              {/* Overview */}
              <p className="text-muted-foreground leading-relaxed text-sm" dir={lang === "ar" ? "rtl" : "ltr"}>
                {lang === "ar" ? prompt.overviewAr : prompt.overviewEn}
              </p>

              {/* Sections */}
              {Object.entries(prompt.sections).map(([key, section]) => (
                <div key={key} className="border-t border-border/30 pt-3">
                  <h4 className="font-semibold text-foreground text-sm flex items-center gap-2 mb-2" dir={lang === "ar" ? "rtl" : "ltr"}>
                    <span>{sectionEmojis[key] || "📌"}</span>
                    <span>{lang === "ar" ? (sectionLabelsAr[key] || key) : key}</span>
                  </h4>
                  <p className="text-muted-foreground leading-relaxed text-sm whitespace-pre-wrap" dir={lang === "ar" ? "rtl" : "ltr"}>
                    {section[lang]}
                  </p>
                </div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </motion.div>
  );
};

export default PromptResult;
