import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface AIModel {
  id: string;
  label: string;
  description: string;
}

export const availableModels: AIModel[] = [
  { id: "google/gemini-3-flash-preview", label: "Gemini 3 Flash", description: "سريع ومتوازن" },
  { id: "google/gemini-2.5-flash", label: "Gemini 2.5 Flash", description: "متوازن وموثوق" },
  { id: "google/gemini-2.5-flash-lite", label: "Gemini 2.5 Flash Lite", description: "الأسرع والأخف" },
  { id: "google/gemini-2.5-pro", label: "Gemini 2.5 Pro", description: "الأقوى والأدق" },
  { id: "google/gemini-3-pro-preview", label: "Gemini 3 Pro", description: "الجيل الجديد الأقوى" },
];

interface ModelSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const ModelSelector = ({ value, onChange }: ModelSelectorProps) => {
  const selected = availableModels.find((m) => m.id === value);

  return (
    <div className="flex items-center gap-3">
      <span className="text-lg">🤖</span>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="flex-1 glass-card border-border/30 rounded-xl h-11">
          <SelectValue>
            {selected ? `${selected.label} — ${selected.description}` : "اختر النموذج"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="rounded-xl">
          {availableModels.map((model) => (
            <SelectItem key={model.id} value={model.id} className="rounded-lg">
              <div className="flex flex-col">
                <span className="font-medium">{model.label}</span>
                <span className="text-xs text-muted-foreground">{model.description}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ModelSelector;
