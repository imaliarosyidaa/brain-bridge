import {
    Heading1, Heading2, Heading3,
    AlignLeft, AlignCenter, AlignRight, AlignJustify,
    Bold, Italic, Strikethrough, Highlighter
} from 'lucide-react';
import { useCallback } from 'react';

export default function MenuBar({ editor }) {
    const toggleHeading1 = useCallback(() => {
        editor?.chain().focus().toggleHeading({ level: 1 }).run();
    }, [editor]);

    const toggleHeading2 = useCallback(() => {
        editor?.chain().focus().toggleHeading({ level: 2 }).run();
    }, [editor]);

    const toggleHeading3 = useCallback(() => {
        editor?.chain().focus().toggleHeading({ level: 3 }).run();
    }, [editor]);

    const setParagraph = useCallback(() => {
        editor?.chain().focus().setParagraph().run();
    }, [editor]);

    const toggleBold = useCallback(() => {
        editor?.chain().focus().toggleBold().run();
    }, [editor]);

    const toggleItalic = useCallback(() => {
        editor?.chain().focus().toggleItalic().run();
    }, [editor]);

    const toggleStrike = useCallback(() => {
        editor?.chain().focus().toggleStrike().run();
    }, [editor]);

    const toggleHighlight = useCallback(() => {
        editor?.chain().focus().toggleHighlight().run();
    }, [editor]);

    const alignLeft = useCallback(() => {
        editor?.chain().focus().setTextAlign('left').run();
    }, [editor]);

    const alignCenter = useCallback(() => {
        editor?.chain().focus().setTextAlign('center').run();
    }, [editor]);

    const alignRight = useCallback(() => {
        editor?.chain().focus().setTextAlign('right').run();
    }, [editor]);

    const alignJustify = useCallback(() => {
        editor?.chain().focus().setTextAlign('justify').run();
    }, [editor]);

    if (!editor) return null;

    const baseButtonClass = 'p-2 rounded-md hover:bg-gray-200';
    const activeClass = 'bg-blue-100 text-blue-700';
    const buttonClass = (isActive) => `${baseButtonClass} ${isActive ? activeClass : ''}`;

    return (
        <div className="flex flex-wrap gap-2 p-2 bg-white border rounded-md shadow-sm">
            <button type='button' onClick={toggleHeading1} className={buttonClass(editor.isActive('heading', { level: 1 }))}>
                <Heading1 size={18} />
            </button>
            <button type='button' onClick={toggleHeading2} className={buttonClass(editor.isActive('heading', { level: 2 }))}>
                <Heading2 size={18} />
            </button>
            <button type='button' onClick={toggleHeading3} className={buttonClass(editor.isActive('heading', { level: 3 }))}>
                <Heading3 size={18} />
            </button>
            <button type='button' onClick={setParagraph} className={buttonClass(editor.isActive('paragraph'))}>
                P
            </button>
            <button type='button' onClick={toggleBold} className={buttonClass(editor.isActive('bold'))}>
                <Bold size={18} />
            </button>
            <button type='button' onClick={toggleItalic} className={buttonClass(editor.isActive('italic'))}>
                <Italic size={18} />
            </button>
            <button type='button' onClick={toggleStrike} className={buttonClass(editor.isActive('strike'))}>
                <Strikethrough size={18} />
            </button>
            <button type='button' onClick={toggleHighlight} className={buttonClass(editor.isActive('highlight'))}>
                <Highlighter size={18} />
            </button>
            <button type='button' onClick={alignLeft} className={buttonClass(editor.isActive({ textAlign: 'left' }))}>
                <AlignLeft size={18} />
            </button>
            <button type='button' onClick={alignCenter} className={buttonClass(editor.isActive({ textAlign: 'center' }))}>
                <AlignCenter size={18} />
            </button>
            <button type='button' onClick={alignRight} className={buttonClass(editor.isActive({ textAlign: 'right' }))}>
                <AlignRight size={18} />
            </button>
            <button type='button' onClick={alignJustify} className={buttonClass(editor.isActive({ textAlign: 'justify' }))}>
                <AlignJustify size={18} />
            </button>
        </div>
    );
}
