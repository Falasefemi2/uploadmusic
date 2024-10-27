'use client'

// import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useRouter } from 'next/navigation'
import { createSong } from '@/app/action'
import { toast } from 'sonner'
import { Upload, X } from 'lucide-react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState } from 'react'





const formSchema = z.object({
    artistName: z.string().min(2, { message: "Artist name must be at least 2 characters." }),
    musicTitle: z.string().min(2, { message: "Music title must be at least 2 characters." }),
    songImage: z.instanceof(File)
        .refine((file) => file.size <= 5000000, `Max image size is 5MB.`)
        .refine(
            (file) => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
            "Only .jpg, .png, and .webp formats are supported."
        ),
    songFile: z.instanceof(File)
        .refine((file) => file.size <= 10000000, `Max file size is 5MB.`)
        .refine(
            (file) => ['audio/mpeg', 'audio/wav'].includes(file.type),
            "Only .mp3 and .wav formats are supported."
        )
})


export default function MusicUploadForm() {
    const [isLoading, setIsLoading] = useState(false)
    const [songImageName, setSongImageName] = useState<string | null>(null)
    const [songFileName, setSongFileName] = useState<string | null>(null)

    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            artistName: '',
            musicTitle: '',
            songImage: undefined,
            songFile: undefined,
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setIsLoading(true)

            const result = await createSong({
                artistName: values.artistName,
                musicTitle: values.musicTitle,
                songImage: values.songImage,
                songFile: values.songFile,
            })

            if (result?.data?.success) {
                toast.success('Song uploaded successfully')
                form.reset()
                router.push('/')
            }
        } catch (error) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const errorMessage = (error as any)?.message || 'An error occurred.'
            toast.error(errorMessage)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <ScrollArea className="h-[calc(100vh-8rem)] px-4 py-6">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="artistName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Artist Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter artist name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="musicTitle"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Music Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter music title" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* <FormField
                        control={form.control}
                        name="songImage"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Cover Image</FormLabel>
                                <FormControl>
                                    <div className="flex items-center justify-center w-full">
                                        <label
                                            htmlFor="songImage"
                                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                        >
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <Upload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or WebP (MAX. 2MB)</p>
                                            </div>
                                            <Input
                                                id="songImage"
                                                type="file"
                                                accept="image/jpeg,image/png,image/webp"
                                                className="hidden"
                                                onChange={(e) => field.onChange(e.target.files?.[0])}
                                            />
                                        </label>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="songFile"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Song File</FormLabel>
                                <FormControl>
                                    <div className="flex items-center justify-center w-full">
                                        <label
                                            htmlFor="songFile"
                                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                        >
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <Upload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">MP3 or WAV (MAX. 10MB)</p>
                                            </div>
                                            <Input
                                                id="songFile"
                                                type="file"
                                                accept="audio/mpeg,audio/wav"
                                                className="hidden"
                                                onChange={(e) => field.onChange(e.target.files?.[0])}
                                            />
                                        </label>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    /> */}


                    <FormField
                        control={form.control}
                        name="songImage"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Cover Image</FormLabel>
                                <FormControl>
                                    <div className="flex flex-col items-center justify-center w-full">
                                        <label
                                            htmlFor="songImage"
                                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                        >
                                            {songImageName ? (
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">{songImageName}</p>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={(e) => {
                                                            e.preventDefault()
                                                            field.onChange(undefined)
                                                            setSongImageName(null)
                                                        }}
                                                    >
                                                        <X className="w-4 h-4 mr-2" />
                                                        Remove
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <Upload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                        <span className="font-semibold">Click to upload</span> or drag and drop
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or WebP (MAX. 2MB)</p>
                                                </div>
                                            )}
                                            <Input
                                                id="songImage"
                                                type="file"
                                                accept="image/jpeg,image/png,image/webp"
                                                className="hidden"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0]
                                                    if (file) {
                                                        field.onChange(file)
                                                        setSongImageName(file.name)
                                                    }
                                                }}
                                            />
                                        </label>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="songFile"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Song File</FormLabel>
                                <FormControl>
                                    <div className="flex flex-col items-center justify-center w-full">
                                        <label
                                            htmlFor="songFile"
                                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                        >
                                            {songFileName ? (
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">{songFileName}</p>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={(e) => {
                                                            e.preventDefault()
                                                            field.onChange(undefined)
                                                            setSongFileName(null)
                                                        }}
                                                    >
                                                        <X className="w-4 h-4 mr-2" />
                                                        Remove
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <Upload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                        <span className="font-semibold">Click to upload</span> or drag and drop
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">MP3 or WAV (MAX. 10MB)</p>
                                                </div>
                                            )}
                                            <Input
                                                id="songFile"
                                                type="file"
                                                accept="audio/mpeg,audio/wav"
                                                className="hidden"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0]
                                                    if (file) {
                                                        field.onChange(file)
                                                        setSongFileName(file.name)
                                                    }
                                                }}
                                            />
                                        </label>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? 'Uploading...' : 'Upload Song'}
                    </Button>
                </form>
            </Form>
        </ScrollArea>
    )
}
