import { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';
import { Anthropic } from '@anthropic-ai/sdk';

const client = new Anthropic();

// Mock desearch functions for Vercel
async function desearchWeb(query: string) {
  try {
    const response = await axios.get('https://desearch.ai/api/search', {
      params: { q: query, type: 'web' },
      timeout: 5000
    });
    return response.data.results || [];
  } catch (error) {
    return [{ title: 'Search unavailable', snippet: 'DESEARCH API temporarily offline', source: 'error' }];
  }
}

async function desearchTwitter(query: string) {
  try {
    const response = await axios.get('https://desearch.ai/api/search', {
      params: { q: query, type: 'twitter' },
      timeout: 5000
    });
    return response.data.results || [];
  } catch (error) {
    return [];
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Health check
  if (req.url === '/health') {
    return res.json({ status: 'ok', version: '0.1.0' });
  }

  // Home page
  if (req.url === '/' && req.method === 'GET') {
    return res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>BitAgent 🤖</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 20px;
            }
            .container {
              background: white;
              border-radius: 12px;
              box-shadow: 0 20px 60px rgba(0,0,0,0.3);
              max-width: 600px;
              width: 100%;
              padding: 40px;
            }
            h1 {
              margin-bottom: 10px;
              color: #333;
              font-size: 2.5em;
            }
            .subtitle {
              color: #666;
              margin-bottom: 30px;
              font-size: 1.1em;
            }
            .form-group {
              margin-bottom: 20px;
            }
            label {
              display: block;
              margin-bottom: 8px;
              color: #333;
              font-weight: 500;
            }
            textarea {
              width: 100%;
              padding: 12px;
              border: 2px solid #e0e0e0;
              border-radius: 8px;
              font-size: 1em;
              font-family: inherit;
              resize: vertical;
              min-height: 80px;
            }
            textarea:focus {
              outline: none;
              border-color: #667eea;
            }
            button {
              width: 100%;
              padding: 14px;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              border: none;
              border-radius: 8px;
              font-size: 1.1em;
              font-weight: 600;
              cursor: pointer;
            }
            button:hover {
              transform: translateY(-2px);
            }
            .loading {
              display: none;
              text-align: center;
              padding: 20px;
              color: #667eea;
            }
            .result {
              margin-top: 30px;
              padding: 20px;
              background: #f5f5f5;
              border-radius: 8px;
              display: none;
            }
            .result h3 {
              margin-bottom: 15px;
              color: #333;
            }
            .result-item {
              background: white;
              padding: 15px;
              margin-bottom: 10px;
              border-radius: 6px;
              border-left: 4px solid #667eea;
            }
            .result-item strong {
              display: block;
              margin-bottom: 5px;
              color: #333;
            }
            .result-item small {
              color: #999;
            }
            .error {
              background: #fee;
              color: #c33;
              padding: 15px;
              border-radius: 8px;
              margin-top: 20px;
              display: none;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>BitAgent 🤖</h1>
            <p class="subtitle">AI Agent for Bittensor Subnet APIs</p>
            
            <form id="agentForm">
              <div class="form-group">
                <label for="intent">What do you want to find?</label>
                <textarea id="intent" placeholder="e.g., Find trending cryptocurrency narratives..." required></textarea>
              </div>
              
              <button type="submit">Search</button>
            </form>
            
            <div class="loading" id="loading">
              <p>🔍 Searching...</p>
            </div>
            
            <div class="error" id="error"></div>
            
            <div class="result" id="result">
              <h3>Results</h3>
              <div id="resultContent"></div>
            </div>
          </div>

          <script>
            document.getElementById('agentForm').addEventListener('submit', async (e) => {
              e.preventDefault();
              const intent = document.getElementById('intent').value;
              
              document.getElementById('loading').style.display = 'block';
              document.getElementById('result').style.display = 'none';
              document.getElementById('error').style.display = 'none';
              
              try {
                const response = await fetch('/api/execute', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ intent })
                });
                
                if (!response.ok) throw new Error('Request failed');
                
                const data = await response.json();
                
                document.getElementById('loading').style.display = 'none';
                document.getElementById('result').style.display = 'block';
                
                let html = '';
                if (data.results && data.results.length > 0) {
                  data.results.forEach(item => {
                    html += \`
                      <div class="result-item">
                        <strong>\${item.title || item.query || 'Result'}</strong>
                        <p>\${item.snippet || item.content || 'N/A'}</p>
                        <small>\${item.source || ''}</small>
                      </div>
                    \`;
                  });
                } else {
                  html = '<p>No results found. Try a different query.</p>';
                }
                
                document.getElementById('resultContent').innerHTML = html;
              } catch (err) {
                document.getElementById('loading').style.display = 'none';
                document.getElementById('error').style.display = 'block';
                document.getElementById('error').textContent = 'Error: ' + err.message;
              }
            });
          </script>
        </body>
      </html>
    `);
  }

  // Execute endpoint
  if (req.url === '/api/execute' && req.method === 'POST') {
    const { intent } = req.body;

    if (!intent) {
      return res.status(400).json({ error: 'Intent is required' });
    }

    try {
      const message = await client.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1024,
        messages: [
          {
            role: 'user',
            content: `User intent: "${intent}"
            
Extract a search query (max 100 chars) and specify if it should search:
- "web" for general web search
- "twitter" for twitter/social search
- "both" for both

Respond in JSON format: { "query": "...", "type": "web|twitter|both" }`
          }
        ]
      });

      let parsed = { query: intent, type: 'web' };
      try {
        const text = message.content[0].type === 'text' ? message.content[0].text : '';
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          parsed = JSON.parse(jsonMatch[0]);
        }
      } catch (e) {
        console.log('Could not parse Claude response');
      }

      let results = [];
      if (parsed.type === 'web' || parsed.type === 'both') {
        const webResults = await desearchWeb(parsed.query);
        results = results.concat(webResults);
      }
      if (parsed.type === 'twitter' || parsed.type === 'both') {
        const twitterResults = await desearchTwitter(parsed.query);
        results = results.concat(twitterResults);
      }

      return res.json({
        intent,
        query: parsed.query,
        searchType: parsed.type,
        results: results.slice(0, 10)
      });
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  }

  return res.status(404).json({ error: 'Not found' });
}
