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
import { useState } from 'react'
import { useRouter } from 'next/navigation'


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
        .refine((file) => file.size <= 10000000, `Max file size is 10MB.`)
        .refine(
            (file) => ['audio/mpeg', 'audio/wav'].includes(file.type),
            "Only .mp3 and .wav formats are supported."
        )
})


export default function MusicUploadForm() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            artistName: "",
            musicTitle: "",
            songImage: undefined,
            songFile: undefined
        }
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="artistName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="Artist Name" {...field} />
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
                                <Input placeholder="Music Title" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="songImage"
                    render={({ field: { onChange, value, ...field } }) => (
                        <FormItem>
                            <FormLabel>Cover Image</FormLabel>
                            <FormControl>
                                <Input
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp"
                                    onChange={(e) => {
                                        onChange(e.target.files?.[0])
                                    }}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="songFile"
                    render={({ field: { onChange, value, ...field } }) => (
                        <FormItem>
                            <FormLabel>Song File</FormLabel>
                            <FormControl>
                                <Input
                                    type="file"
                                    accept="audio/mpeg,audio/wav"
                                    onChange={(e) => {
                                        onChange(e.target.files?.[0])
                                    }}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full">
                    Upload Song
                </Button>


            </form>
        </Form>
    )
}
