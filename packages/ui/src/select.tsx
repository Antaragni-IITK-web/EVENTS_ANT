"use client";

import * as React from "react";
import * as RadixSelect from "@radix-ui/react-select";
import { FaCheck } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa";
import { cn } from "./util";

interface SelectProps {
	value: string;
	onValueChange: (val: string) => void;
	placeholder?: string;
	options: { label: string; value: string }[];
}

export function Select({
	value,
	onValueChange,
	placeholder = "Select an option",
	options,
}: SelectProps) {
	return (
		<RadixSelect.Root value={value} onValueChange={onValueChange}>
			<RadixSelect.Trigger asChild>
				<button
					className={cn(
						"group/select inline-flex h-10 w-full items-center justify-between rounded-md border-1 border-white/10 bg-black/40 px-3 py-2 text-sm text-white shadow-input transition duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
					)}
				>
					<RadixSelect.Value placeholder={placeholder} />
					<RadixSelect.Icon>
						<FaChevronDown className="h-4 w-4 opacity-50" />
					</RadixSelect.Icon>
				</button>
			</RadixSelect.Trigger>

			<RadixSelect.Portal>
				<RadixSelect.Content
					position="popper"
					side="bottom"
					sideOffset={4}
					className={cn(
						"z-50 w-[var(--radix-select-trigger-width)] overflow-hidden rounded-md border border-white/10 bg-[#0a0a0a] text-white p-1 shadow-lg"
					)}
				>
					<RadixSelect.Viewport className="max-h-[20vh] overflow-y-auto">
						{options.map((option) => (
							<RadixSelect.Item
								key={option.value}
								value={option.value}
								className={cn(
									"relative flex cursor-pointer select-none items-center rounded-sm px-3 py-2 text-sm outline-none transition hover:bg-white/10 focus:bg-white/10"
								)}
							>
								<RadixSelect.ItemText>{option.label}</RadixSelect.ItemText>
								<RadixSelect.ItemIndicator className="absolute right-2">
									<FaCheck className="h-4 w-4" />
								</RadixSelect.ItemIndicator>
							</RadixSelect.Item>
						))}
					</RadixSelect.Viewport>
				</RadixSelect.Content>
			</RadixSelect.Portal>
		</RadixSelect.Root>
	);
}
