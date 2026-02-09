'use client';

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useAppContext } from "@/context/AppContext";

export default function ShippingAddressPage() {
    const { country } = useAppContext();

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Shipping address</h1>
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="space-y-6">
                    <div>
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country/Region</label>
                        <div className="flex items-center gap-2 p-2 border rounded-md bg-gray-50 w-full md:w-1/2">
                            <img src={`https://flagcdn.com/${country.code.toLowerCase()}.svg`} width="20" alt={`${country.name} flag`} />
                            <span>{country.name}</span>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold">Contact information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                            <div>
                                <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-1">Contact name*</label>
                                <Input id="contactName" />
                                <p className="text-xs text-gray-500 mt-1">Please enter a contact name.</p>
                            </div>

                            <div>
                                <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700 mb-1">Mobile number*</label>
                                <div className="flex">
                                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                        +880
                                    </span>
                                    <Input id="mobileNumber" placeholder="Mobile number" className="rounded-l-none" />
                                </div>
                            </div>
                        </div>
                    </div>


                    <div>
                        <h2 className="text-lg font-semibold">Address</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                             <div>
                                <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">Street, house/apartment/unit*</label>
                                <Input id="street" />
                            </div>
                             <div>
                                <label htmlFor="apt" className="block text-sm font-medium text-gray-700 mb-1">Apt, suite, unit, etc (optional)</label>
                                <Input id="apt" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                            <div>
                                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State/Province*</label>
                                <Input id="state" />
                            </div>

                            <div>
                                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City*</label>
                                <Input id="city" />
                            </div>

                            <div>
                                <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">ZIP code*</label>
                                <Input id="zip" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                        <Checkbox id="default-address" />
                        <label
                          htmlFor="default-address"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Set as default shipping address
                        </label>
                    </div>
                </div>

                <div className="mt-8 flex justify-start space-x-4">
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8">Confirm</Button>
                    <Button variant="outline" className="px-8">Cancel</Button>
                </div>
            </div>
        </div>
    );
}
