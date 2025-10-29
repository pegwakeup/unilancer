import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Search, Zap, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getBlogPosts, type BlogPost } from '../lib/supabase';
