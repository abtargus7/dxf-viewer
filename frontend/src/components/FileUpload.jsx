import React, { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import API_BASE_URL from "@/utils/api";
import { useNavigate } from "react-router-dom";

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate()

    const handleFileChange = (e) => {
        setFile(e.target.files?.[0] || null);
        setMessage("");
    };

    const handleUpload = async () => {
        if (!file) {
            toast("Please select a file first.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            setUploading(true);
            const res = await axios.post(`${API_BASE_URL}v1/file`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if(!res) throw new Error("File upload Fail")
            console.log(res.data)
            setFile(res.data)
            toast("File uploaded successfully!");
            navigate(`/blocks/${res.data.data.id}`)
        } catch (err) {
            console.error(err);
            toast("Failed to upload file.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Upload a CAD File</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="file">Choose file</Label>
                        <Input id="file" type="file" onChange={handleFileChange} />
                    </div>
                    <Button onClick={handleUpload} disabled={uploading}>
                        {uploading ? "Uploading..." : "Upload"}
                    </Button>
                    {message && <p className="text-sm text-center text-muted-foreground">{message}</p>}
                </CardContent>
            </Card>
        </div>
    );
};

export default FileUpload;
