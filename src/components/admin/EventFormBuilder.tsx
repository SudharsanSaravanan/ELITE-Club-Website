'use client';

import { useState } from 'react';

export type FormFieldConfig = {
    id: string;
    field_name: string;
    field_label: string;
    field_type: 'text' | 'textarea' | 'email' | 'phone' | 'number' | 'select' | 'multi_select' | 'radio' | 'checkbox' | 'date' | 'time' | 'file' | 'url';
    is_required: boolean;
    options: string[];
    placeholder: string;
    display_order: number;
    auto_fill_from?: string;
    is_editable?: boolean;
};

interface EventFormBuilderProps {
    fields: FormFieldConfig[];
    onChange: (fields: FormFieldConfig[]) => void;
}

export default function EventFormBuilder({ fields, onChange }: EventFormBuilderProps) {
    const updateFields = (newFields: FormFieldConfig[]) => {
        onChange(newFields);
    };

    const addField = () => {
        const newField: FormFieldConfig = {
            id: Date.now().toString() + Math.random().toString().slice(2),
            field_name: `field_${fields.length + 1}`,
            field_label: 'New Question',
            field_type: 'text',
            is_required: true,
            options: [],
            placeholder: '',
            display_order: fields.length,
            is_editable: true
        };
        updateFields([...fields, newField]);
    };

    const removeField = (id: string) => {
        updateFields(fields.filter(f => f.id !== id));
    };

    const updateField = (id: string, updates: Partial<FormFieldConfig>) => {
        const updated = fields.map(f => {
            if (f.id === id) return { ...f, ...updates };
            return f;
        });
        updateFields(updated);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-foreground font-clash">Application Form Questions</h3>
                <button
                    type="button"
                    onClick={addField}
                    className="px-4 py-2 bg-primary text-foreground font-semibold rounded-xl text-sm hover:scale-105 transition-transform shadow-md"
                >
                    + Add Question
                </button>
            </div>

            {fields.length === 0 && (
                <div className="text-center py-8 border border-dashed border-muted/30 rounded-xl text-muted text-sm glass">
                    No questions added. Users will only submit their profile data.
                </div>
            )}

            <div className="space-y-4">
                {fields.map((field, index) => (
                    <div key={field.id} className="glass border border-card-border p-4 rounded-xl space-y-4 shadow-md">
                        <div className="flex justify-between items-start">
                            <span className="text-xs text-primary font-mono uppercase font-bold">Question {index + 1}</span>
                            <button
                                type="button"
                                onClick={() => removeField(field.id)}
                                className="text-red-500 text-xs hover:text-red-400 font-medium"
                            >
                                Remove
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs text-muted mb-1">Label (Question Text)</label>
                                <input
                                    type="text"
                                    value={field.field_label}
                                    onChange={e => updateField(field.id, { field_label: e.target.value, field_name: e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '_') })}
                                    className="w-full px-3 py-2 bg-white/50 border border-card-border rounded-lg text-sm text-foreground focus:border-primary outline-none transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-muted mb-1">Type</label>
                                <select
                                    value={field.field_type}
                                    onChange={e => updateField(field.id, { field_type: e.target.value as any })}
                                    className="w-full px-3 py-2 bg-white/50 border border-card-border rounded-lg text-sm text-foreground focus:border-primary outline-none transition-colors"
                                >
                                    <option value="text">Short Text</option>
                                    <option value="textarea">Long Text</option>
                                    <option value="select">Dropdown (Select)</option>
                                    <option value="email">Email</option>
                                    <option value="phone">Phone</option>
                                    <option value="url">Link (URL)</option>
                                    <option value="file">File Upload</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={field.is_required}
                                    onChange={e => updateField(field.id, { is_required: e.target.checked })}
                                    className="rounded border-card-border bg-white/50 text-primary focus:ring-primary"
                                />
                                <span className="text-sm text-foreground">Required</span>
                            </label>
                        </div>

                        {field.field_type === 'select' && (
                            <div>
                                <label className="block text-xs text-muted mb-1">Options (comma separated)</label>
                                <input
                                    type="text"
                                    placeholder="Option 1, Option 2, Option 3"
                                    value={field.options?.join(', ')}
                                    onChange={e => updateField(field.id, { options: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                                    className="w-full px-3 py-2 bg-white/50 border border-card-border rounded-lg text-sm text-foreground focus:border-primary outline-none transition-colors"
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
