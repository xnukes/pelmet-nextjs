import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, ClipboardDocumentListIcon, DocumentTextIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React, { Fragment } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const user = {
    name: 'Pepa Novák',
    email: 'demo@example.com',
    imageUrl: 'data:image/jpeg;base64,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',
}

const navigation = [
    { name: 'Nástěnka', href: '/', icon: DocumentTextIcon},
    { name: 'Úkoly (CSR)', href: '/todos', icon: null},
    { name: 'Úkoly (SSR)', href: '/todos-ssr', icon: null},
    { name: 'Poznámky', href: '/notes', icon: null},
    { name: 'O aplikaci', href: '/about', icon: null},
]

const userNavigation = [
    { name: 'Nastavení', href: '#' },
    { name: 'Odhlásit', href: '#' },
]

function classNames(...classes)
{
    return classes.filter(Boolean).join(' ')
}

export const Header = () => {
    const { route } = useRouter();

    return (
        <>
            <Disclosure as="nav" className="bg-gray-800">
                {({ open }) => (
                    <>
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="flex h-16 items-center justify-between">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <ClipboardDocumentListIcon className="h-8 w-8 text-white" />
                                    </div>
                                    <div className="hidden md:block">
                                        <div className="ml-10 flex items-baseline space-x-4">
                                            {navigation.map((item) => (
                                                <Link
                                                    href={item.href}
                                                    key={item.href}
                                                    className={classNames(
                                                        item.href === route
                                                            ? 'bg-gray-900 text-white'
                                                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                        'rounded-md px-3 py-2 text-sm font-medium'
                                                    )}
                                                >
                                                    {item.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="hidden md:block">
                                    <div className="ml-4 flex items-center md:ml-6">
                                        <button type="button" className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="sr-only">Notifikace</span>
                                            <BellIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>

                                        <Menu as="div" className="relative ml-3">
                                            <div>
                                                <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                    <span className="sr-only">Open user menu</span>
                                                    <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
                                                </Menu.Button>
                                            </div>
                                            <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                                                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    {userNavigation.map((item) => (
                                                        <Menu.Item key={item.name}>
                                                            {({ active }) => (
                                                                <a href={item.href} className={classNames(
                                                                    active ? 'bg-gray-100' : '',
                                                                    'block px-4 py-2 text-sm text-gray-700'
                                                                )}>
                                                                    {item.name}
                                                                </a>
                                                            )}
                                                        </Menu.Item>
                                                    ))}
                                                </Menu.Items> </Transition> </Menu>
                                    </div>
                                </div>
                                <div className="-mr-2 flex md:hidden">
                                    {/* Mobile menu button */}
                                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                        <span className="sr-only">Open main menu</span> {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                    </Disclosure.Button>
                                </div>
                            </div>
                        </div>

                        <Disclosure.Panel className="md:hidden">
                            <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                                {navigation.map((item) => (
                                    <Disclosure.Button key={item.name} as="a" href={item.href} className={classNames(
                                        item.href === route ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'block rounded-md px-3 py-2 text-base font-medium'
                                    )} aria-current={item.href === route ? 'page' : undefined}>
                                        {item.name}
                                    </Disclosure.Button>
                                ))}
                            </div>
                            <div className="border-t border-gray-700 pt-4 pb-3">
                                <div className="flex items-center px-5">
                                    <div className="flex-shrink-0">
                                        <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                                    </div>
                                    <div className="ml-3">
                                        <div className="text-base font-medium leading-none text-white">{user.name}</div>
                                        <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                                    </div>
                                    <button type="button" className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                        <span className="sr-only">View notifications</span>
                                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>
                                <div className="mt-3 space-y-1 px-2">
                                    {userNavigation.map((item) => (
                                        <Disclosure.Button key={item.name} as="a" href={item.href} className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">
                                            {item.name}
                                        </Disclosure.Button>
                                    ))}
                                </div>
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
        </>
    )
};
