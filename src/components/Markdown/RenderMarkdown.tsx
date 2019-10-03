/**
 * @file Component permettant de render du markdown avec des emojis
 */

import React, { ReactNode, Component } from 'react';
import Markdown from "markdown-to-jsx";
import emoji from 'node-emoji';
//@ts-ignore
import twemoji from 'twemoji';


export default function RenderMarkdown ({children} : {children: string}) {

    return (
        <div>

            <Markdown>
                {twemoji.parse(emoji.emojify(children), {
                    folder: 'svg',
                    ext: '.svg'
                })}
            </Markdown>
        
        </div>
    );
}



