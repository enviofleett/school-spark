'use client'

import { useState } from 'react'

export default function SectionForm({ section, updateAction }: { section: any, updateAction: (formData: FormData) => Promise<void> }) {
  const [content, setContent] = useState(section.content || {})
  const [isSaving, setIsSaving] = useState(false)

  // Handle nested form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContent({ ...content, [e.target.name]: e.target.value })
  }

  // Handle generic array items (e.g. arms in Capability Grid)
  const handleArrayChange = (arrayName: string, index: number, field: string, value: string) => {
    const updatedArray = [...(content[arrayName] || [])]
    if (!updatedArray[index]) updatedArray[index] = {}
    updatedArray[index][field] = value
    setContent({ ...content, [arrayName]: updatedArray })
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    const formData = new FormData()
    formData.append('section_id', section.id)
    formData.append('content', JSON.stringify(content))
    await updateAction(formData)
    setIsSaving(false)
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Dynamic Fields based on Section Type */}
      
      {section.section_type === 'hero_banner' && (
        <>
          <div>
            <label className="block text-sm font-medium text-textLight mb-1">Headline (HTML allowed)</label>
            <textarea name="headline" value={content.headline || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-24" placeholder="Strategy that survives <br /> contact with the ground." />
          </div>
          <div>
            <label className="block text-sm font-medium text-textLight mb-1">Subheadline</label>
            <textarea name="subheadline" value={content.subheadline || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-24" />
          </div>
          <div>
            <label className="block text-sm font-medium text-textLight mb-1">Background Image URL</label>
            <input type="text" name="image_url" value={content.image_url || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" placeholder="/hero-banner.png" />
          </div>
        </>
      )}

      {section.section_type === 'text_block' && (
        <>
          <div>
            <label className="block text-sm font-medium text-textLight mb-1">Title</label>
            <input type="text" name="title" value={content.title || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-textLight mb-1">Body Text (HTML allowed)</label>
            <textarea name="body" value={content.body || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-32" />
          </div>
        </>
      )}

      {section.section_type === 'capability_grid' && (
        <>
          <div>
            <label className="block text-sm font-medium text-textLight mb-1">Main Title (HTML allowed)</label>
            <textarea name="title" value={content.title || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-16" placeholder="Two disciplines. <br /> One accountable firm." />
          </div>
          <div>
            <label className="block text-sm font-medium text-textLight mb-1">Subtitle</label>
            <textarea name="subtitle" value={content.subtitle || ''} onChange={handleChange} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-16" />
          </div>

          <div className="pt-4 border-t border-white/10 mt-4 space-y-6">
            <h4 className="text-white font-semibold">Grid Items (Arms)</h4>
            {[0, 1, 2].map((i) => {
              const arm = content.arms?.[i] || {}
              return (
                <div key={i} className="bg-deepGray/50 p-4 rounded border border-white/5 space-y-3">
                  <div className="text-xs text-brandRed font-bold mb-2">ARM 0{i + 1}</div>
                  <input type="text" placeholder="Title" value={arm.title || ''} onChange={(e) => handleArrayChange('arms', i, 'title', e.target.value)} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white text-sm" />
                  <textarea placeholder="Description" value={arm.description || ''} onChange={(e) => handleArrayChange('arms', i, 'description', e.target.value)} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-20 text-sm" />
                  <input type="text" placeholder="Link URL" value={arm.link || ''} onChange={(e) => handleArrayChange('arms', i, 'link', e.target.value)} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white text-sm" />
                </div>
              )
            })}
          </div>
        </>
      )}

      {/* Fallback for unconfigured section types */}
      {!['hero_banner', 'text_block', 'capability_grid'].includes(section.section_type) && (
        <div>
          <label className="block text-sm font-medium text-textLight mb-1">Raw JSON Content</label>
          <textarea name="content" value={JSON.stringify(content, null, 2)} onChange={(e) => {
            try { setContent(JSON.parse(e.target.value)) } catch {}
          }} className="w-full px-4 py-2 bg-deepGray border border-white/10 rounded text-white h-48 font-mono text-xs" />
        </div>
      )}

      <button type="submit" disabled={isSaving} className="bg-brandRed hover:bg-red-700 px-6 py-2 rounded text-white font-medium text-sm transition-colors mt-4">
        {isSaving ? 'Saving...' : 'Save Content'}
      </button>
    </form>
  )
}
