"use client";

import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { Bot, Send, X, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { getSmartReply } from "@/lib/chatbot-engine";

type Message = {
  id: number;
  isUser: boolean;
  text: string;
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  /* Initial greeting */
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 1,
          isUser: false,
          text: "Hello! I am Suprabha Electricals’ assistant. You can ask me about our services, experience, licenses, or contact details.",
        },
      ]);
    }
  }, [isOpen, messages.length]);

  /* Centralized scroll helper */
  const scrollToBottom = () => {
    if (!viewportRef.current) return;
    viewportRef.current.scrollTop = viewportRef.current.scrollHeight;
  };

  /**
   * 🔥 CRITICAL PART
   * useLayoutEffect runs AFTER DOM paint but BEFORE browser paint
   * so loader + messages are guaranteed to exist
   */
  useLayoutEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  /* Refocus input after bot finishes */
  useEffect(() => {
    if (!isLoading && isOpen) {
      inputRef.current?.focus();
    }
  }, [isLoading, isOpen]);

  const handleSend = () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now(),
      isUser: true,
      text: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      const reply = getSmartReply(input);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          isUser: false,
          text: reply,
        },
      ]);

      setIsLoading(false);
    }, 600);
  };

  return (
    <>
      {/* Floating Open Button */}
      <div
        className={cn(
          "fixed bottom-4 right-4 z-[60] transition-transform",
          isOpen ? "translate-x-[calc(100%+2rem)]" : "translate-x-0"
        )}
      >
        <Button
          size="icon"
          className="h-16 w-16 rounded-full shadow-lg bg-primary text-primary-foreground"
          onClick={() => setIsOpen(true)}
        >
          <Bot className="h-8 w-8" />
        </Button>
      </div>

      {/* Chat Window */}
      <div
        className={cn(
          "fixed bottom-4 right-4 z-[60] w-[calc(100%-2rem)] max-w-sm transition-transform",
          isOpen ? "translate-x-0" : "translate-x-[calc(100%+2rem)]"
        )}
      >
        <Card className="h-[70vh] flex flex-col shadow-2xl">
          {/* Header */}
          <CardHeader className="flex flex-row items-center justify-between border-b">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <Bot />
                </AvatarFallback>
              </Avatar>
              <h3 className="font-semibold">Suprabha Assistant</h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>

          {/* Messages */}
          <CardContent className="flex-1 overflow-hidden p-0">
            <ScrollArea className="h-full">
              <div ref={viewportRef} className="p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex items-end gap-2",
                      message.isUser ? "justify-end" : "justify-start"
                    )}
                  >
                    {!message.isUser && (
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}

                    <div
                      className={cn(
                        "max-w-[75%] rounded-lg px-4 py-2 text-sm",
                        message.isUser
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {message.text}
                    </div>

                    {message.isUser && (
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}

                {isLoading && (
                  <div className="flex items-end gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="rounded-lg px-4 py-2 bg-muted">
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>

          {/* Input */}
          <CardFooter className="border-t p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex w-full gap-2"
            >
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about services, licenses, or contact..."
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="icon"
                disabled={isLoading}
                className="text-primary-foreground"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
