"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, Save, X, GripVertical, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface FieldDef {
  key: string;
  label: string;
  type: "text" | "textarea" | "number" | "select" | "json-array" | "boolean" | "json-skills";
  options?: { value: string; label: string }[];
  placeholder?: string;
  required?: boolean;
}

interface ContentManagerProps {
  title: string;
  type: string;
  fields: FieldDef[];
  items: Record<string, unknown>[];
  onSave: (item: Record<string, unknown>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onCreate: (item: Record<string, unknown>) => Promise<void>;
  loading?: boolean;
}

export default function ContentManager({
  title,
  fields,
  items,
  onSave,
  onDelete,
  onCreate,
}: ContentManagerProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Record<string, unknown>>({});
  const [isCreating, setIsCreating] = useState(false);
  const [newData, setNewData] = useState<Record<string, unknown>>({});

  const startEdit = (item: Record<string, unknown>) => {
    setEditingId(item.id as string);
    setEditData({ ...item });
    setIsCreating(false);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleSave = async () => {
    await onSave(editData);
    setEditingId(null);
    setEditData({});
  };

  const startCreate = () => {
    const defaults: Record<string, unknown> = {};
    fields.forEach((f) => {
      if (f.type === "number") defaults[f.key] = 0;
      else if (f.type === "boolean") defaults[f.key] = false;
      else if (f.type === "json-array" || f.type === "json-skills") defaults[f.key] = "[]";
      else defaults[f.key] = "";
    });
    defaults.visible = true;
    defaults.sortOrder = items.length;
    setNewData(defaults);
    setIsCreating(true);
    setEditingId(null);
  };

  const handleCreate = async () => {
    await onCreate(newData);
    setIsCreating(false);
    setNewData({});
  };

  const renderField = (
    field: FieldDef,
    data: Record<string, unknown>,
    setData: (d: Record<string, unknown>) => void
  ) => {
    const value = data[field.key];

    if (field.type === "boolean") {
      return (
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={!!value}
            onChange={(e) => setData({ ...data, [field.key]: e.target.checked })}
            className="rounded"
          />
          <span className="text-sm">{field.label}</span>
        </label>
      );
    }

    if (field.type === "select" && field.options) {
      return (
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">
            {field.label}
          </label>
          <select
            value={(value as string) || ""}
            onChange={(e) => setData({ ...data, [field.key]: e.target.value })}
            className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
          >
            {field.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      );
    }

    if (field.type === "textarea") {
      return (
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">
            {field.label}
          </label>
          <textarea
            value={(value as string) || ""}
            onChange={(e) => setData({ ...data, [field.key]: e.target.value })}
            placeholder={field.placeholder}
            rows={3}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-y min-h-[60px]"
          />
        </div>
      );
    }

    if (field.type === "json-array") {
      let arr: string[] = [];
      try {
        arr = typeof value === "string" ? JSON.parse(value) : (value as string[]) || [];
      } catch { arr = []; }
      return (
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">
            {field.label}
          </label>
          <textarea
            value={arr.join("\n")}
            onChange={(e) => {
              const lines = e.target.value.split("\n");
              setData({ ...data, [field.key]: JSON.stringify(lines.filter(Boolean)) });
            }}
            placeholder="Un élément par ligne"
            rows={4}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono resize-y min-h-[80px]"
          />
          <p className="text-[10px] text-muted-foreground mt-0.5">Un élément par ligne</p>
        </div>
      );
    }

    if (field.type === "json-skills") {
      let skills: { name: string; level: number; label: string }[] = [];
      try {
        skills = typeof value === "string" ? JSON.parse(value) : (value as typeof skills) || [];
      } catch { skills = []; }
      return (
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">
            {field.label}
          </label>
          <div className="space-y-2">
            {skills.map((skill, i) => (
              <div key={i} className="flex gap-2 items-center">
                <Input
                  value={skill.name}
                  onChange={(e) => {
                    const updated = [...skills];
                    updated[i] = { ...updated[i], name: e.target.value };
                    setData({ ...data, [field.key]: JSON.stringify(updated) });
                  }}
                  placeholder="Compétence"
                  className="flex-1 h-8 text-xs"
                />
                <Input
                  type="number"
                  min={0}
                  max={100}
                  value={skill.level}
                  onChange={(e) => {
                    const updated = [...skills];
                    updated[i] = { ...updated[i], level: parseInt(e.target.value) || 0 };
                    setData({ ...data, [field.key]: JSON.stringify(updated) });
                  }}
                  className="w-16 h-8 text-xs"
                />
                <select
                  value={skill.label}
                  onChange={(e) => {
                    const updated = [...skills];
                    updated[i] = { ...updated[i], label: e.target.value };
                    setData({ ...data, [field.key]: JSON.stringify(updated) });
                  }}
                  className="h-8 rounded-md border border-input bg-background px-2 text-xs"
                >
                  <option value="Expert">Expert</option>
                  <option value="Avancé">Avancé</option>
                  <option value="Intermédiaire">Intermédiaire</option>
                  <option value="Débutant">Débutant</option>
                </select>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive shrink-0"
                  onClick={() => {
                    const updated = skills.filter((_, j) => j !== i);
                    setData({ ...data, [field.key]: JSON.stringify(updated) });
                  }}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => {
                const updated = [...skills, { name: "", level: 80, label: "Avancé" }];
                setData({ ...data, [field.key]: JSON.stringify(updated) });
              }}
            >
              <Plus className="h-3 w-3 mr-1" /> Ajouter
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div>
        <label className="text-xs font-medium text-muted-foreground mb-1 block">
          {field.label}
        </label>
        <Input
          type={field.type === "number" ? "number" : "text"}
          value={(value as string | number) ?? ""}
          onChange={(e) =>
            setData({
              ...data,
              [field.key]: field.type === "number" ? parseInt(e.target.value) || 0 : e.target.value,
            })
          }
          placeholder={field.placeholder}
          className="h-8 text-sm"
        />
      </div>
    );
  };

  const renderForm = (
    data: Record<string, unknown>,
    setData: (d: Record<string, unknown>) => void,
    onSubmit: () => void,
    onCancel: () => void,
    submitLabel: string
  ) => (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="overflow-hidden"
    >
      <Card className="border-primary/30 bg-primary/5">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {fields.map((field) => (
              <div
                key={field.key}
                className={
                  field.type === "textarea" || field.type === "json-array" || field.type === "json-skills"
                    ? "sm:col-span-2"
                    : ""
                }
              >
                {renderField(field, data, setData)}
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-border">
            <Button variant="ghost" size="sm" onClick={onCancel}>
              <X className="h-3.5 w-3.5 mr-1" /> Annuler
            </Button>
            <Button size="sm" onClick={onSubmit}>
              <Save className="h-3.5 w-3.5 mr-1" /> {submitLabel}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-base font-semibold">{title}</h2>
          <p className="text-xs text-muted-foreground">{items.length} élément(s)</p>
        </div>
        <Button size="sm" className="gap-1.5" onClick={startCreate}>
          <Plus className="h-3.5 w-3.5" /> Ajouter
        </Button>
      </div>

      <AnimatePresence>
        {isCreating &&
          renderForm(newData, setNewData, handleCreate, () => setIsCreating(false), "Créer")}
      </AnimatePresence>

      <div className="space-y-2 mt-3">
        {items.map((item) => (
          <div key={item.id as string}>
            {editingId === item.id ? (
              <AnimatePresence>
                {renderForm(editData, setEditData, handleSave, cancelEdit, "Sauvegarder")}
              </AnimatePresence>
            ) : (
              <motion.div
                layout
                className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-muted/30 transition-colors group"
              >
                <GripVertical className="h-4 w-4 text-muted-foreground/30 shrink-0" />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium truncate">
                      {(item.name || item.title || item.category || item.id) as string}
                    </span>
                    {item.status != null && (
                      <Badge variant="outline" className="text-[10px]">
                        {String(item.status)}
                      </Badge>
                    )}
                    {item.visible === false && (
                      <Badge variant="secondary" className="text-[10px] gap-0.5">
                        <EyeOff className="h-2.5 w-2.5" /> Masqué
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">
                    {(item.description || item.company || item.content || item.period || "") as string}
                  </p>
                </div>

                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => startEdit(item)}
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-destructive"
                    onClick={() => onDelete(item.id as string)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {items.length === 0 && !isCreating && (
        <div className="text-center py-8 text-sm text-muted-foreground">
          Aucun élément. Cliquez sur &quot;Ajouter&quot; pour commencer.
        </div>
      )}
    </div>
  );
}
