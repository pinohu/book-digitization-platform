from celery import shared_task
from backend.agents.growth_engineer import GrowthEngineerAgent
from backend.agents.tools.growth_tools import FunnelAnalyzerTool, GrowthPlannerTool
from langchain.chat_models import ChatOpenAI
import os
from dotenv import load_dotenv

load_dotenv()

@shared_task
def analyze_funnel(venture_id: str, funnel_data: dict):
    """Analyze marketing funnel data for a venture."""
    try:
        # Initialize tools
        funnel_analyzer = FunnelAnalyzerTool()
        growth_planner = GrowthPlannerTool()
        
        # Initialize agent
        agent = GrowthEngineerAgent(
            config={
                "name": f"growth_engineer_{venture_id}",
                "description": "Growth Engineer for venture analysis",
                "tools": [funnel_analyzer, growth_planner],
                "llm": ChatOpenAI(temperature=0)
            }
        )
        
        # Run analysis
        result = agent.analyze_funnel(funnel_data)
        return {"success": True, "result": result}
    except Exception as e:
        return {"success": False, "error": str(e)}

@shared_task
def create_growth_plan(venture_id: str, venture_data: dict):
    """Create a growth plan for a venture."""
    try:
        # Initialize tools
        funnel_analyzer = FunnelAnalyzerTool()
        growth_planner = GrowthPlannerTool()
        
        # Initialize agent
        agent = GrowthEngineerAgent(
            config={
                "name": f"growth_engineer_{venture_id}",
                "description": "Growth Engineer for venture planning",
                "tools": [funnel_analyzer, growth_planner],
                "llm": ChatOpenAI(temperature=0)
            }
        )
        
        # Create growth plan
        result = agent.create_growth_plan(venture_data)
        return {"success": True, "result": result}
    except Exception as e:
        return {"success": False, "error": str(e)} 