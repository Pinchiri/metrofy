"use client";
import React, { useEffect, useState } from 'react';
import {useSearchParams } from "next/navigation";
import { useUserData } from "@/context/userContext";

import ArtistsView from './artistsView';

export default function Artists(){

    return <ArtistsView/>
}