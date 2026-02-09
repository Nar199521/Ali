
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { MoreToLove } from "@/components/more-to-love";
import { Sidebar } from "@/components/ui/sidebar";
import { slugify } from "@/lib/utils";

const SubCategoryPage = ({ params }: { params: { category: string, subcategory: string } }) => {
    return (
        <div className="container mx-auto p-6">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/category/${params.category}`}>{params.category.replace(/-/g, ' ')}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{params.subcategory.replace(/-/g, ' ')}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex pt-4">
                <Sidebar />
                <div className="w-4/5">
                    <MoreToLove category={params.subcategory} />
                </div>
            </div>
        </div>
    );
};

export default SubCategoryPage;
