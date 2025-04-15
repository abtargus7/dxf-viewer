import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../utils/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext
} from "@/components/ui/pagination";
import VerticesTable from "../components/VerticesTable";
import path from "path";


const EntityList = () => {
    const { id } = useParams();
    const [entities, setEntities] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalEntities, setTotalEntities] = useState(0);
    const [totalPages, setTotalPages] = useState(0)

    const itemsPerPage = 10;

    //fetch data from server
    const fetchEntities = async (page) => {
        try {
            const res = await axios.get(`${API_BASE_URL}v1/entities/${id}?page=${page}&limit=${itemsPerPage}`);
            setEntities(res.data.data.entities);
            setTotalEntities(res.data.data.total)
            setTotalPages(res.data.data.totalPages)
            console.log(res.data.data)
        } catch (err) {
            console.error("Failed to load entities:", err);
        }
    };

    //function to limit pagination pages
    const getPaginationItems = (current, total) => {
        const pages = [];

        if (total <= 7) {
            return Array.from({ length: total }, (_, i) => i + 1);
        }

        pages.push(1); // always show first

        if (current > 3) pages.push("...");

        for (let i = current - 1; i <= current + 1; i++) {
            if (i > 1 && i < total) pages.push(i);
        }

        if (current < total - 2) pages.push("...");

        pages.push(total); // always show last

        return pages;
    };

    //calls when page changes
    useEffect(() => {
        fetchEntities(currentPage);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [currentPage]);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4">Entities for Block: {id}</h1>
            <ul className="space-y-2">
                {/* render all entities */}
                {entities.length > 0 ? (entities?.map((entity, idx) => (
                    <Card key={idx} className="w-full shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold">{entity.type}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm text-muted-foreground">
                            <div><strong>Coordinates:</strong> <VerticesTable coordinates={entity.coOrdinates} type={entity.type} /></div>
                            <div><strong>Handle:</strong> {entity.handle}</div>
                            <div><strong>Color Index:</strong> {entity.colorIndex}</div>
                            <div><strong>Color:</strong> {entity.color}</div>
                        </CardContent>
                    </Card>
                ))) : (<p>No entities Found</p>)}
            </ul>
            {/* render pagination component */}
            {totalPages > 1 && (
                <div className="mt-6 flex justify-center">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                                />
                            </PaginationItem>

                            {getPaginationItems(currentPage, totalPages).map((page, index) => (
                                <PaginationItem key={index}>
                                    {page === "..." ? (
                                        <span className="px-2 text-muted-foreground">...</span>
                                    ) : (
                                        <PaginationLink
                                            isActive={currentPage === page}
                                            onClick={() => setCurrentPage(page)}
                                        >
                                            {page}
                                        </PaginationLink>
                                    )}
                                </PaginationItem>
                            ))}

                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
        </div>
    );
};

export default EntityList;
